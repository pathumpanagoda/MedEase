// src/appointment/appointment.dto.ts
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  readonly patientName: string;

  @IsString()
  readonly doctorName: string;

  @IsString()
  readonly hospital: string;

  @IsDate()
  readonly date: Date;

  @IsOptional()
  @IsString()
  readonly specialService?: string;
}

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  readonly status?: 'Pending' | 'Confirmed' | 'Cancelled';
}
