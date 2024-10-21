// src/patient/patient.interface.ts
import { Document } from 'mongoose';

export interface Patient extends Document {
  id: string;
  name: string;
  contactInfo: string;
  medicalHistory: string;
  healthcareCard: string;
}
