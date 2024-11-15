import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Gender } from 'src/roles/roles.gender';
  
  @Entity('patients')
  export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    phone: string;
  
    @Column()
    address: string;
  
    @Column()
    birthDate: Date;
  
    @Column({type: 'enum',enum: Gender})
    gender: Gender;
    
    // @OneToOne(() => UserEntity, (user) => user.patient)
    // @JoinColumn()
    // user: UserEntity;
  
    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];
  }
  
