import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity'
import { DayWeek } from 'src/roles/roles.day';
  
Entity('schedules')
export class Schedule {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'enum',enum: DayWeek})
    dayOfWeek: DayWeek;
  
    @Column({ type: 'timestamp' })
    startTime: Date;
  
    @Column({ type: 'timestamp' })
    endTime: Date;
  
    @ManyToOne(() => Doctor, (doctor) => doctor.schedules)
    doctor: Doctor;
}
  
