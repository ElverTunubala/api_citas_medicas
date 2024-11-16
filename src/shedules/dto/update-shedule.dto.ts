import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from './create-shedule.dto';

export class UpdateSheduleDto extends PartialType(CreateScheduleDto ) {}
