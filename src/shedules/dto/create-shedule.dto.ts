import { IsDate, IsUUID, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { DayWeek } from 'src/roles/roles.day';

export class CreateScheduleDto {

    @IsNotEmpty()
    @IsEnum(DayWeek)
    dayOfWeek: DayWeek;
  
    @IsDate()
    @IsDateString() 
    startTime: Date;
  
    @IsDate()
    @IsDateString() 
    endTime: Date;
  
    @IsUUID()
    doctorId: string;
}
  