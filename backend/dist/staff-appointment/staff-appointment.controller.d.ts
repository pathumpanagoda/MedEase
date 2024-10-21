import { StaffAppointmentService } from './staff-appointment.service';
import { CreateStaffAppointmentDto, UpdateStaffAppointmentDto } from './staff-appointment.dto';
export declare class StaffAppointmentController {
    private readonly staffAppointmentService;
    constructor(staffAppointmentService: StaffAppointmentService);
    createStaffAppointment(createStaffAppointmentDto: CreateStaffAppointmentDto): Promise<import("./staff-appointment.interface").StaffAppointment>;
    getAllStaffAppointments(): Promise<import("./staff-appointment.interface").StaffAppointment[]>;
    getStaffAppointmentById(id: string): Promise<import("./staff-appointment.interface").StaffAppointment>;
    updateStaffAppointment(id: string, updateStaffAppointmentDto: UpdateStaffAppointmentDto): Promise<import("./staff-appointment.interface").StaffAppointment>;
    deleteStaffAppointment(id: string): Promise<import("./staff-appointment.interface").StaffAppointment>;
}
