import { IsString, IsDate, IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/roles/roles.gender';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsDate()
  birthDate: Date;
  
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

}
