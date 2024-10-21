import { Document } from 'mongoose';
export interface Appointment extends Document {
    id: string;
    patientName: string;
    doctorName: string;
    hospital: string;
    date: Date;
    specialService?: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}
