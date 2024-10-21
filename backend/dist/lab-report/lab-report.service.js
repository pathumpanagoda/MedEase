"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabReportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lab_report_factory_1 = require("./lab-report.factory");
const lab_report_status_1 = require("./lab-report-status");
let LabReportService = class LabReportService {
    constructor(labReportModel, labReportFactory) {
        this.labReportModel = labReportModel;
        this.labReportFactory = labReportFactory;
    }
    async createLabReport(createLabReportDto) {
        const { patientId, reportDetails, doctorId, fileUrl } = createLabReportDto;
        const newLabReport = this.labReportFactory.createLabReport(patientId, reportDetails, doctorId, fileUrl, lab_report_status_1.LabReportStatus.PENDING);
        return this.labReportModel.create(newLabReport);
    }
    async getAllLabReports() {
        return this.labReportModel.find().exec();
    }
    async getLabReportById(id) {
        const labReport = await this.labReportModel.findById(id).exec();
        if (!labReport) {
            throw new common_1.NotFoundException(`Lab Report with ID ${id} not found`);
        }
        return labReport;
    }
    async updateLabReport(id, updateLabReportDto) {
        const updatedLabReport = await this.labReportModel
            .findByIdAndUpdate(id, updateLabReportDto, { new: true })
            .exec();
        if (!updatedLabReport) {
            throw new common_1.NotFoundException(`Lab Report with ID ${id} not found`);
        }
        return updatedLabReport;
    }
    async deleteLabReport(id) {
        const deletedLabReport = await this.labReportModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedLabReport) {
            throw new common_1.NotFoundException(`Lab Report with ID ${id} not found`);
        }
        return deletedLabReport;
    }
};
exports.LabReportService = LabReportService;
exports.LabReportService = LabReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('LabReport')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        lab_report_factory_1.LabReportFactory])
], LabReportService);
//# sourceMappingURL=lab-report.service.js.map