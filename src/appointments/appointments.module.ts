import { Global, Module } from '@nestjs/common';
import { AppointmentService} from './appointments.service';
import { AppointmentController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentsModule {}
