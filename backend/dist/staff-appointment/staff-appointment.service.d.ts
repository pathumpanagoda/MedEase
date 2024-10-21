import { Model } from 'mongoose';
import { StaffAppointment } from './staff-appointment.interface';
import { CreateStaffAppointmentDto, UpdateStaffAppointmentDto } from './staff-appointment.dto';
import { StaffAppointmentSubject } from './staff-appointment.subject';
export declare class StaffAppointmentService {
    private readonly staffAppointmentModel;
    private readonly staffAppointmentSubject;
    constructor(staffAppointmentModel: Model<StaffAppointment>, staffAppointmentSubject: StaffAppointmentSubject);
    createStaffAppointment(createStaffAppointmentDto: CreateStaffAppointmentDto): Promise<StaffAppointment>;
    getAllStaffAppointments(): Promise<StaffAppointment[]>;
    getStaffAppointmentById(id: string): Promise<StaffAppointment>;
    updateStaffAppointment(id: string, updateStaffAppointmentDto: UpdateStaffAppointmentDto): Promise<StaffAppointment>;
    deleteStaffAppointment(id: string): Promise<StaffAppointment>;
}
