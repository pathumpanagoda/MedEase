"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabReportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lab_report_controller_1 = require("./lab-report.controller");
const lab_report_service_1 = require("./lab-report.service");
const lab_report_schema_1 = require("./lab-report.schema");
const lab_report_factory_1 = require("./lab-report.factory");
let LabReportModule = class LabReportModule {
};
exports.LabReportModule = LabReportModule;
exports.LabReportModule = LabReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'LabReport', schema: lab_report_schema_1.LabReportSchema }]),
        ],
        controllers: [lab_report_controller_1.LabReportController],
        providers: [lab_report_service_1.LabReportService, lab_report_factory_1.LabReportFactory],
    })
], LabReportModule);
//# sourceMappingURL=lab-report.module.js.map