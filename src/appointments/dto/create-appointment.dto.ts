import { IsString, IsDate, IsUUID } from 'class-validator';

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
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  patientId: string;
}

