import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, startTime, endTime } = createAppointmentDto;

    // Verificar conflictos de horario
    const overlappingAppointments = await this.appointmentRepository.find({
      where: [
        { doctor: { id: doctorId }, startTime: Between(startTime, endTime) },
        { doctor: { id: doctorId }, endTime: Between(startTime, endTime) },
      ],
    });

    if (overlappingAppointments.length > 0) {
      throw new BadRequestException('El médico ya tiene una cita en este horario.');
    }

    // Crear y guardar la cita
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async findAll(filters?: {
    date?: string;
    specialty?: string;
    reason?: string;
  }): Promise<Appointment[]> {
    const query = this.appointmentRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.patient', 'patient');

    if (filters?.date) {
      query.andWhere('DATE(appointment.startTime) = :date', { date: filters.date });
    }
    if (filters?.specialty) {
      query.andWhere('doctor.specialty = :specialty', { specialty: filters.specialty });
    }
    if (filters?.reason) {
      query.andWhere('appointment.reason LIKE :reason', { reason: `%${filters.reason}%` });
    }

    return query.getMany();
  }

  async updateNotes(id: string, notes: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada.');
    }

    appointment.notes = notes;
    return this.appointmentRepository.save(appointment);
  }
}
