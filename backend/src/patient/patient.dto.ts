// src/patient/patient.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly contactInfo: string;

  @IsString()
  readonly medicalHistory: string;

  @IsString()
  readonly healthcareCard: string;
}

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  readonly contactInfo?: string;

  @IsOptional()
  @IsString()
  readonly medicalHistory?: string;

  @IsOptional()
  @IsString()
  readonly healthcareCard?: string;
}
