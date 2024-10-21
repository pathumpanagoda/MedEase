// src/staff-appointment/staff-appointment.schema.ts
import * as mongoose from 'mongoose';

export const StaffAppointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Rejected'],
      default: 'Pending',
    },
    hospital: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
