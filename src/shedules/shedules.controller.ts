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
import { ScheduleService } from './shedules.service';
import { CreateScheduleDto } from './dto/create-shedule.dto';
import { DayWeek } from 'src/roles/roles.day';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  async findAll(
    @Query('dayOfWeek') dayOfWeek?: DayWeek,
    @Query('startTime') startTime?: Date,
    @Query('endTime') endTime?: Date,
    @Query('doctorId') doctorId?: string,
  ) {
    return this.scheduleService.findAll({ dayOfWeek, startTime, endTime, doctorId });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.scheduleService.findById(id);
  }

  @Put(':id')
  async updateSchedule(@Param('id') id: string, @Body() updateScheduleDto: Partial<CreateScheduleDto>) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: string) {
    return this.scheduleService.delete(id);
  }
}
