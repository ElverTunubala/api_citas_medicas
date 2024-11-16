import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../doctors/entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const doctor = this.doctorRepository.create(createDoctorDto);
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      throw new Error('Error creating doctor: ' + error.message);
    }
  }

  async findAll(query: { gender?: string; status?: string }): Promise<Doctor[]> {
    try {
      const { gender, status } = query;
      const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');

      if (gender) {
        queryBuilder.andWhere('doctor.gender = :gender', { gender });
      }
      if (status !== undefined) {
        queryBuilder.andWhere('doctor.status = :status', { status: status === 'true' });
      }

      return await queryBuilder.getMany();
    } catch (error) {
      throw new Error('Error fetching doctors: ' + error.message);
    }
  }

  async findById(id: string): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.findOne({
        where: { id },
        relations: ['appointments', 'schedules'],
      });
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      return doctor;
    } catch (error) {
      throw new Error('Error finding doctor: ' + error.message);
    }
  }

  async update(id: string, updateDoctorDto: Partial<CreateDoctorDto>): Promise<Doctor> {
    try {
      const doctor = await this.findById(id);
      Object.assign(doctor, updateDoctorDto);
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      throw new Error('Error updating doctor: ' + error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const doctor = await this.findById(id);
      await this.doctorRepository.remove(doctor);
    } catch (error) {
      throw new Error('Error deleting doctor: ' + error.message);
    }
  }
}
