import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../shedules/entities/shedule.entity';
import { CreateScheduleDto } from './dto/create-shedule.dto';
import { DoctorService } from '../doctors/doctors.service';
import { DayWeek } from 'src/roles/roles.day';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly doctorService: DoctorService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    try {
      const { doctorId, dayOfWeek, ...scheduleData } = createScheduleDto;

      const doctor = await this.doctorService.findById(doctorId);
      if (!doctor.status) { 
        throw new Error('Doctor is not available for scheduling.');
      }

      const existingSchedules = await this.scheduleRepository.count({
        where: { doctor: { id: doctorId } },
      });
      if (existingSchedules >= doctor.availability) {
          throw new ConflictException(`Doctor can only schedule ${doctor.availability} days.`);
      }

      const existingSchedule = await this.scheduleRepository.findOne({
        where: {
          doctor: { id: doctorId },
          dayOfWeek: dayOfWeek, 
        },
      });

      if (existingSchedule) {
        throw new ConflictException(`Doctor already has a schedule on ${dayOfWeek}.`);
      }
      const schedule = this.scheduleRepository.create({
        ...scheduleData,
        doctor,
        dayOfWeek,
      });

      if (existingSchedules + 1 >= doctor.availability) {
        doctor.status = false; 
        await this.doctorService.create(doctor);  
      }
      return await this.scheduleRepository.save(schedule);
      
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new Error('Error creating schedule: ' + error.message);
      }
    }
  }

  async findAll(query: { dayOfWeek?: DayWeek; startTime?: Date; endTime?: Date; doctorId?: string }): Promise<Schedule[]> {
    try {
      const { dayOfWeek, startTime, endTime, doctorId } = query;
      const queryBuilder = this.scheduleRepository.createQueryBuilder('schedule');

      if (dayOfWeek) {
        queryBuilder.andWhere('schedule.dayOfWeek = :dayOfWeek', { dayOfWeek });
      }
      if (startTime) {
        queryBuilder.andWhere('schedule.startTime >= :startTime', { startTime });
      }
      if (endTime) {
        queryBuilder.andWhere('schedule.endTime <= :endTime', { endTime });
      }
      if (doctorId) {
        queryBuilder.andWhere('schedule.doctor.id = :doctorId', { doctorId });
      }

      return await queryBuilder.leftJoinAndSelect('schedule.doctor', 'doctor').getMany();
    } catch (error) {
      throw new Error('Error fetching schedules: ' + error.message);
    }
  }

  async findById(id: string): Promise<Schedule> {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id },
        relations: ['doctor'],
      });
      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw new Error('Error finding schedule: ' + error.message);
    }
  }

  async update(id: string, updateScheduleDto: Partial<CreateScheduleDto>): Promise<Schedule> {
    try {
      const schedule = await this.findById(id);
      Object.assign(schedule, updateScheduleDto);
      return await this.scheduleRepository.save(schedule);
    } catch (error) {
      throw new Error('Error updating schedule: ' + error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const schedule = await this.findById(id);
      await this.scheduleRepository.remove(schedule);
    } catch (error) {
      throw new Error('Error deleting schedule: ' + error.message);
    }
  }
}
