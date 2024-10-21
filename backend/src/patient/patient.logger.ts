// src/patient/patient.logger.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientLogger {
  log(message: string) {
    console.log(`Patient Log: ${message}`);
  }
}
