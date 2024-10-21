// src/staff-appointment/staff-appointment.dto.ts
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateStaffAppointmentDto {
  @IsString()
  readonly patientName: string;

  @IsString()
  readonly doctorName: string;

  @IsString()
  readonly hospital: string;

  @IsDate()
  readonly appointmentDate: Date;
}

export class UpdateStaffAppointmentDto {
  @IsOptional()
  @IsString()
  readonly status?: 'Pending' | 'Confirmed' | 'Rejected';
}
