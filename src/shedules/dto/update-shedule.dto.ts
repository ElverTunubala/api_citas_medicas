import { PartialType } from '@nestjs/swagger';
import { CreateSheduleDto } from './create-shedule.dto';

export class UpdateSheduleDto extends PartialType(CreateSheduleDto) {}
