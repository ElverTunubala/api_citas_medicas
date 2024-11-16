import { IsString, IsUUID, IsEnum, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Gender } from 'src/roles/roles.gender';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  specialization: string;
  
  @IsNumber()
  availability: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  phone: string;

  @IsBoolean()
  status: boolean;
}

