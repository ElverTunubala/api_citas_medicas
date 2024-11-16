import { Global, Module } from '@nestjs/common';
import { AppointmentService} from './appointments.service';
import { AppointmentController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctors/doctors.service';
import { PatientService } from 'src/patients/patients.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Appointment,Doctor,Patient])],
  controllers: [AppointmentController],
  providers: [AppointmentService,DoctorService, PatientService],
})
export class AppointmentsModule {}
