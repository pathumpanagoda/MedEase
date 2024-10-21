import { PatientService } from './patient.service';
import { PatientLogger } from './patient.logger';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
export declare class PatientDecorator {
    private readonly patientService;
    private readonly patientLogger;
    constructor(patientService: PatientService, patientLogger: PatientLogger);
    createPatient(createPatientDto: CreatePatientDto): Promise<import("./patient.interface").Patient>;
    updatePatient(id: string, updatePatientDto: UpdatePatientDto): Promise<import("./patient.interface").Patient>;
    deletePatient(id: string): Promise<import("./patient.interface").Patient>;
    getAllPatients(): Promise<import("./patient.interface").Patient[]>;
    getPatientById(id: string): Promise<import("./patient.interface").Patient>;
}
