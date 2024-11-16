import { Global, Module } from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { DoctorController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/shedules/entities/shedule.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Doctor,Schedule])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService,TypeOrmModule],
})
export class DoctorsModule {}
