import { IsString, IsDate, IsUUID, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  createDate: Date;

  @IsString()
  reason: string;

  @IsString()
  status: string;

  @IsString()
  notes: string;

  @IsString()
  address: string;

  @IsDate()
  @IsDateString()  
  startTime: Date;

  @IsDate()
  @IsDateString()  
  endTime: Date;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  patientId: string;
}

