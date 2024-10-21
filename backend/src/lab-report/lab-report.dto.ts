// src/lab-report/lab-report.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateLabReportDto {
  @IsString()
  readonly patientId: string;

  @IsString()
  readonly reportDetails: string;

  @IsString()
  readonly doctorId: string;

  @IsString()
  readonly fileUrl: string;
}

export class UpdateLabReportDto {
  @IsOptional()
  @IsString()
  readonly status?: 'Pending' | 'Distributed';
}
