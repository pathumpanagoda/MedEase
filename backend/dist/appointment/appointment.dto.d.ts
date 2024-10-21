export declare class CreateAppointmentDto {
    readonly patientName: string;
    readonly doctorName: string;
    readonly hospital: string;
    readonly date: Date;
    readonly specialService?: string;
}
export declare class UpdateAppointmentDto {
    readonly status?: 'Pending' | 'Confirmed' | 'Cancelled';
}
