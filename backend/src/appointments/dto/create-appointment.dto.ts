import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  barberId!: number;

  @IsDateString()
  date!: Date;

  @IsString()
  @IsNotEmpty()
  time!: string;

  @IsString()
  @IsNotEmpty()
  service!: string;
}
