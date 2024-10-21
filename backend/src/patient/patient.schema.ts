// src/patient/patient.schema.ts
import * as mongoose from 'mongoose';

export const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    medicalHistory: { type: String, required: true },
    healthcareCard: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
