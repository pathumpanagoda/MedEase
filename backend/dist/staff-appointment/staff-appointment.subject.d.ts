import { StaffAppointmentObserver } from './staff-appointment.observer';
export declare class StaffAppointmentSubject {
    private observers;
    addObserver(observer: StaffAppointmentObserver): void;
    removeObserver(observer: StaffAppointmentObserver): void;
    notifyAll(patientName: string, doctorName: string, status: string): void;
}
