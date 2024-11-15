import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PatientService } from '../patients/patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.patientService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: Partial<CreatePatientDto>) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.patientService.delete(id);
    return { message: 'Patient deleted successfully' };
  }
}
