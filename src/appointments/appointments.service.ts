import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DoctorService } from 'src/doctors/doctors.service';
import { PatientService } from 'src/patients/patients.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId,patientId, startTime, endTime } = createAppointmentDto;

    const overlappingAppointments = await this.appointmentRepository.find({
      where: [
        { doctor: { id: doctorId }, startTime: Between(startTime, endTime) },
        { doctor: { id: doctorId }, endTime: Between(startTime, endTime) },
      ],
    });

    if (overlappingAppointments.length > 0) {
      throw new BadRequestException('El médico ya tiene una cita en este horario.');
    }
    const doctor = await this.doctorService.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor no encontrado');
    }
    const patient = await this.patientService.findById(patientId);
    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      doctor,
      patient,
      createDate: new Date(),
    });

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
  
  async update(id: string, updateAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, patientId, startTime, endTime } = updateAppointmentDto;
  
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['doctor', 'patient'] });
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada.');
    }
    const doctor = await this.doctorService.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor no encontrado');
    }
    const patient = await this.patientService.findById(patientId);
    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }
    const overlappingAppointments = await this.appointmentRepository.find({
      where: [
        { doctor: { id: doctorId }, startTime: Between(startTime, endTime) },
        { doctor: { id: doctorId }, endTime: Between(startTime, endTime) },
      ],
    });
  
    if (overlappingAppointments.length > 0) {
      throw new BadRequestException('El médico ya tiene una cita en este horario.');
    }
  
    appointment.startTime = startTime;
    appointment.endTime = endTime;
    appointment.reason = updateAppointmentDto.reason;
    appointment.status = updateAppointmentDto.status;
    appointment.notes = updateAppointmentDto.notes;
    appointment.address = updateAppointmentDto.address;
    appointment.patient = patient;  
    appointment.doctor = doctor;    
  
    return this.appointmentRepository.save(appointment);
  }
  
}
