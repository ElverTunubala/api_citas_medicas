import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentService } from '../appointments/appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try {
      return await this.appointmentService.create(createAppointmentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(
    @Query('date') date?: string,
    @Query('specialty') specialty?: string,
    @Query('reason') reason?: string,
  ) {
    try {
      return await this.appointmentService.findAll({ date, specialty, reason });
    } catch (error) {
      throw new HttpException('Error al obtener citas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/notes')
  async updateNotes(@Param('id') id: string, @Body('notes') notes: string) {
    try {
      return await this.appointmentService.updateNotes(id, notes);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string,
  @Body() updateAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    
    return this.appointmentService.update(id, updateAppointmentDto);
  }
}
