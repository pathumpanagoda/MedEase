// src/appointment/appointment.schema.ts
import * as mongoose from 'mongoose';

export const AppointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    hospital: { type: String, required: true },
    date: { type: Date, required: true },
    specialService: { type: String, required: false },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);
