export declare class CreatePatientDto {
    readonly name: string;
    readonly contactInfo: string;
    readonly medicalHistory: string;
    readonly healthcareCard: string;
}
export declare class UpdatePatientDto {
    readonly contactInfo?: string;
    readonly medicalHistory?: string;
    readonly healthcareCard?: string;
}
