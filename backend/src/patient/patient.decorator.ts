import { Injectable } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientLogger } from './patient.logger';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

@Injectable()
export class PatientDecorator {
  constructor(
    private readonly patientService: PatientService,
    private readonly patientLogger: PatientLogger,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    this.patientLogger.log(`Creating patient: ${createPatientDto.name}`);
    return await this.patientService.createPatient(createPatientDto);
  }

  async updatePatient(id: string, updatePatientDto: UpdatePatientDto) {
    this.patientLogger.log(`Updating patient with ID: ${id}`);
    return await this.patientService.updatePatient(id, updatePatientDto);
  }

  async deletePatient(id: string) {
    this.patientLogger.log(`Deleting patient with ID: ${id}`);
    return await this.patientService.deletePatient(id);
  }

  async getAllPatients() {
    this.patientLogger.log('Fetching all patients');
    return await this.patientService.getAllPatients();
  }

  async getPatientById(id: string) {
    this.patientLogger.log(`Fetching patient with ID: ${id}`);
    return await this.patientService.getPatientById(id);
  }
}
