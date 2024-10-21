import { Model } from 'mongoose';
import { Appointment } from './appointment.interface';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentService {
    private readonly appointmentModel;
    constructor(appointmentModel: Model<Appointment>);
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    getAllAppointments(): Promise<Appointment[]>;
    getAppointmentById(id: string): Promise<Appointment>;
    updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    deleteAppointment(id: string): Promise<Appointment>;
}
