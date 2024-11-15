import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.create(createDoctorDto);
  }

  @Get()
  async findAll(@Query('gender') gender?: string, @Query('status') status?: string) {
    return await this.doctorService.findAll({ gender, status });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.doctorService.findById(id);
  }

  @Put(':id')
  async updateDoctor(@Param('id') id: string, @Body() updateDoctorDto: Partial<CreateDoctorDto>) {
    return await this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    return await this.doctorService.delete(id);
  }
}
