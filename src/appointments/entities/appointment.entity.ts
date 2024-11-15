import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Doctor } from '../../doctors/entities/doctor.entity';
  import { Patient } from '../../patients/entities/patient.entity';
  
  @Entity('appointments')
  export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    createDate: Date;
  
    @Column()
    reason: string;
  
    @Column()
    status: string;
  
    @Column()
    notes: string;
  
    @Column()
    address: string;
  
    @Column()
    startTime: Date;
  
    @Column()
    endTime: Date;
  
    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor: Doctor;
  
    @ManyToOne(() => Patient, (patient) => patient.appointments)
    patient: Patient;
  }
  
