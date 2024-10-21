// src/staff-appointment/staff-appointment.interface.ts
import { Document } from 'mongoose';

export interface StaffAppointment extends Document {
  id: string;
  patientName: string;
  doctorName: string;
  appointmentDate: Date;
  hospital: string;
  status: 'Pending' | 'Confirmed' | 'Rejected';
}
