import { Model } from 'mongoose';
import { LabReport } from './lab-report.interface';
import { LabReportFactory } from './lab-report.factory';
import { CreateLabReportDto, UpdateLabReportDto } from './lab-report.dto';
export declare class LabReportService {
    private readonly labReportModel;
    private readonly labReportFactory;
    constructor(labReportModel: Model<LabReport>, labReportFactory: LabReportFactory);
    createLabReport(createLabReportDto: CreateLabReportDto): Promise<LabReport>;
    getAllLabReports(): Promise<LabReport[]>;
    getLabReportById(id: string): Promise<LabReport>;
    updateLabReport(id: string, updateLabReportDto: UpdateLabReportDto): Promise<LabReport>;
    deleteLabReport(id: string): Promise<LabReport>;
}
