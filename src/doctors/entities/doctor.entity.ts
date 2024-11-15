import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { UserEntity } from '../../users/entities/user.entity';
  import { Appointment } from './appointment.entity';
  import { Schedule } from './schedule.entity';
import { Gender } from 'src/roles/roles.gender';
  
@Entity('doctors')
  export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    specialization: string;
  
    @Column()
    availability: string;
  
    @Column({type: 'enum',enum: Gender})
    gender: Gender;
  
    @Column()
    phone: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;
  
    @OneToOne(() => UserEntity, (user) => user.doctor)
    @JoinColumn()
    user: UserEntity;
  
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
  
    @OneToMany(() => Schedule, (schedule) => schedule.doctor)
    schedules: Schedule[];
  }
  