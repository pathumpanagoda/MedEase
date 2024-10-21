import { Model } from 'mongoose';
import { Patient } from './patient.interface';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
export declare class PatientService {
    private readonly patientModel;
    constructor(patientModel: Model<Patient>);
    createPatient(createPatientDto: CreatePatientDto): Promise<Patient>;
    getAllPatients(): Promise<Patient[]>;
    getPatientById(id: string): Promise<Patient>;
    updatePatient(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient>;
    deletePatient(id: string): Promise<Patient>;
}
