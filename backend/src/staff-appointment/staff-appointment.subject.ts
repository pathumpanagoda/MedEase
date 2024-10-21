// src/staff-appointment/staff-appointment.subject.ts
import { Injectable } from '@nestjs/common';
import { StaffAppointmentObserver } from './staff-appointment.observer';

@Injectable()
export class StaffAppointmentSubject {
  private observers: StaffAppointmentObserver[] = [];

  addObserver(observer: StaffAppointmentObserver) {
    this.observers.push(observer);
  }

  removeObserver(observer: StaffAppointmentObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyAll(patientName: string, doctorName: string, status: string) {
    this.observers.forEach((observer) =>
      observer.notify(patientName, doctorName, status),
    );
  }
}
