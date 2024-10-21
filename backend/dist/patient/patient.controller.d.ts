import { PatientDecorator } from './patient.decorator';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
export declare class PatientController {
    private readonly patientDecorator;
    constructor(patientDecorator: PatientDecorator);
    createPatient(createPatientDto: CreatePatientDto): Promise<import("./patient.interface").Patient>;
    getAllPatients(): Promise<import("./patient.interface").Patient[]>;
    getPatientById(id: string): Promise<import("./patient.interface").Patient>;
    updatePatient(id: string, updatePatientDto: UpdatePatientDto): Promise<import("./patient.interface").Patient>;
    deletePatient(id: string): Promise<import("./patient.interface").Patient>;
}
