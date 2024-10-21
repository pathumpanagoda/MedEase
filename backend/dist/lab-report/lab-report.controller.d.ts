import { LabReportService } from './lab-report.service';
import { CreateLabReportDto, UpdateLabReportDto } from './lab-report.dto';
export declare class LabReportController {
    private readonly labReportService;
    constructor(labReportService: LabReportService);
    createLabReport(createLabReportDto: CreateLabReportDto): Promise<import("./lab-report.interface").LabReport>;
    getAllLabReports(): Promise<import("./lab-report.interface").LabReport[]>;
    getLabReportById(id: string): Promise<import("./lab-report.interface").LabReport>;
    updateLabReport(id: string, updateLabReportDto: UpdateLabReportDto): Promise<import("./lab-report.interface").LabReport>;
    deleteLabReport(id: string): Promise<import("./lab-report.interface").LabReport>;
}
