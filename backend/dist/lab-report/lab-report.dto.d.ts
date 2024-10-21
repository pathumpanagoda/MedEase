export declare class CreateLabReportDto {
    readonly patientId: string;
    readonly reportDetails: string;
    readonly doctorId: string;
    readonly fileUrl: string;
}
export declare class UpdateLabReportDto {
    readonly status?: 'Pending' | 'Distributed';
}
