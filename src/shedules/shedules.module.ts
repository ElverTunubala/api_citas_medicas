import { Global, Module } from '@nestjs/common';
import { ScheduleService } from './shedules.service';
import { ScheduleController } from './shedules.controller';
import { Schedule } from './entities/shedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Schedule,Doctor])],
  controllers: [ScheduleController],
  providers: [ScheduleService,DoctorService],
})
export class ShedulesModule {}
