import { Module } from '@nestjs/common';
import { PatientService } from './patients.service';
import { PatientController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientsModule {}
