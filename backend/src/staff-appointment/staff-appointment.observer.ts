// src/staff-appointment/staff-appointment.observer.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class StaffAppointmentObserver {
  notify(patientName: string, doctorName: string, status: string) {
    console.log(
      `Notification: Appointment status for ${patientName} with Dr. ${doctorName} has been ${status}`,
    );
  }
}
