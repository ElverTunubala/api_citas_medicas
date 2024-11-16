import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Schedule } from '../../shedules/entities/shedule.entity';
import { Gender } from 'src/roles/roles.gender';
  
@Entity()
export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    specialization: string;
  
    @Column()
    availability: number;
  
    @Column({type: 'enum',enum: Gender})
    gender: Gender;
  
    @Column()
    phone: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;
  
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
  
    @OneToMany(() => Schedule, (schedule) => schedule.doctor)
    schedules: Schedule[];
  }
  