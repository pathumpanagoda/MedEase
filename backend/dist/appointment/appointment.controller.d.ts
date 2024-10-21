import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<import("./appointment.interface").Appointment>;
    getAllAppointments(): Promise<import("./appointment.interface").Appointment[]>;
    getAppointmentById(id: string): Promise<import("./appointment.interface").Appointment>;
    updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<import("./appointment.interface").Appointment>;
    deleteAppointment(id: string): Promise<import("./appointment.interface").Appointment>;
}
