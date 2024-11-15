import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const patient = this.patientRepository.create(createPatientDto);
      return await this.patientRepository.save(patient);
    } catch (error) {
      throw new Error('Error creating patient: ' + error.message);
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientRepository.find({
        relations: ['appointments'],
      });
    } catch (error) {
      throw new Error('Error fetching patients: ' + error.message);
    }
  }

  async findById(id: string): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOne({
        where: { id },
        relations: ['appointments'],
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      return patient;
    } catch (error) {
      throw new Error('Error finding patient: ' + error.message);
    }
  }

  async update(id: string, updatePatientDto: Partial<CreatePatientDto>): Promise<Patient> {
    try {
      const patient = await this.findById(id);

      Object.assign(patient, updatePatientDto);
      return await this.patientRepository.save(patient);
    } catch (error) {
      throw new Error('Error updating patient: ' + error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const patient = await this.findById(id);
      await this.patientRepository.remove(patient);
    } catch (error) {
      throw new Error('Error deleting patient: ' + error.message);
    }
  }
}
