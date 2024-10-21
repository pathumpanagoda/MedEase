// src/lab-report/lab-report.interface.ts
import { Document } from 'mongoose';

export interface LabReport extends Document {
  id: string;
  patientId: string;
  reportDetails: string;
  doctorId: string;
  status: 'Pending' | 'Distributed';
  fileUrl: string;
}
