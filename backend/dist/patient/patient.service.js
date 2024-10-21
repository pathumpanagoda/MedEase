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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PatientService = class PatientService {
    constructor(patientModel) {
        this.patientModel = patientModel;
    }
    async createPatient(createPatientDto) {
        return await this.patientModel.create(createPatientDto);
    }
    async getAllPatients() {
        return this.patientModel.find().exec();
    }
    async getPatientById(id) {
        const patient = await this.patientModel.findById(id).exec();
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return patient;
    }
    async updatePatient(id, updatePatientDto) {
        const updatedPatient = await this.patientModel
            .findByIdAndUpdate(id, updatePatientDto, { new: true })
            .exec();
        if (!updatedPatient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return updatedPatient;
    }
    async deletePatient(id) {
        const deletedPatient = await this.patientModel.findByIdAndDelete(id).exec();
        if (!deletedPatient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return deletedPatient;
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Patient')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PatientService);
//# sourceMappingURL=patient.service.js.map