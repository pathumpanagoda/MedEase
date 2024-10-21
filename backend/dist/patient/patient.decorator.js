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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientDecorator = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("./patient.service");
const patient_logger_1 = require("./patient.logger");
let PatientDecorator = class PatientDecorator {
    constructor(patientService, patientLogger) {
        this.patientService = patientService;
        this.patientLogger = patientLogger;
    }
    async createPatient(createPatientDto) {
        this.patientLogger.log(`Creating patient: ${createPatientDto.name}`);
        return await this.patientService.createPatient(createPatientDto);
    }
    async updatePatient(id, updatePatientDto) {
        this.patientLogger.log(`Updating patient with ID: ${id}`);
        return await this.patientService.updatePatient(id, updatePatientDto);
    }
    async deletePatient(id) {
        this.patientLogger.log(`Deleting patient with ID: ${id}`);
        return await this.patientService.deletePatient(id);
    }
    async getAllPatients() {
        this.patientLogger.log('Fetching all patients');
        return await this.patientService.getAllPatients();
    }
    async getPatientById(id) {
        this.patientLogger.log(`Fetching patient with ID: ${id}`);
        return await this.patientService.getPatientById(id);
    }
};
exports.PatientDecorator = PatientDecorator;
exports.PatientDecorator = PatientDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        patient_logger_1.PatientLogger])
], PatientDecorator);
//# sourceMappingURL=patient.decorator.js.map