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
exports.LabReportController = void 0;
const common_1 = require("@nestjs/common");
const lab_report_service_1 = require("./lab-report.service");
const lab_report_dto_1 = require("./lab-report.dto");
let LabReportController = class LabReportController {
    constructor(labReportService) {
        this.labReportService = labReportService;
    }
    async createLabReport(createLabReportDto) {
        return this.labReportService.createLabReport(createLabReportDto);
    }
    async getAllLabReports() {
        return this.labReportService.getAllLabReports();
    }
    async getLabReportById(id) {
        return this.labReportService.getLabReportById(id);
    }
    async updateLabReport(id, updateLabReportDto) {
        return this.labReportService.updateLabReport(id, updateLabReportDto);
    }
    async deleteLabReport(id) {
        return this.labReportService.deleteLabReport(id);
    }
};
exports.LabReportController = LabReportController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lab_report_dto_1.CreateLabReportDto]),
    __metadata("design:returntype", Promise)
], LabReportController.prototype, "createLabReport", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LabReportController.prototype, "getAllLabReports", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabReportController.prototype, "getLabReportById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lab_report_dto_1.UpdateLabReportDto]),
    __metadata("design:returntype", Promise)
], LabReportController.prototype, "updateLabReport", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabReportController.prototype, "deleteLabReport", null);
exports.LabReportController = LabReportController = __decorate([
    (0, common_1.Controller)('lab-reports'),
    __metadata("design:paramtypes", [lab_report_service_1.LabReportService])
], LabReportController);
//# sourceMappingURL=lab-report.controller.js.map