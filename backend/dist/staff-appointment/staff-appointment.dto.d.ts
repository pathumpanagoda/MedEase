export declare class CreateStaffAppointmentDto {
    readonly patientName: string;
    readonly doctorName: string;
    readonly hospital: string;
    readonly appointmentDate: Date;
}
export declare class UpdateStaffAppointmentDto {
    readonly status?: 'Pending' | 'Confirmed' | 'Rejected';
}
