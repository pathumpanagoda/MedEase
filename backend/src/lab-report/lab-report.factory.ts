// src/lab-report/lab-report.factory.ts
import { Injectable } from '@nestjs/common';
import { LabReportStatus } from './lab-report-status';

@Injectable()
export class LabReportFactory {
  createLabReport(
    patientId: string,
    reportDetails: string,
    doctorId: string,
    fileUrl: string,
    status: LabReportStatus,
  ) {
    return {
      patientId,
      reportDetails,
      doctorId,
      fileUrl,
      status,
    };
  }
}
