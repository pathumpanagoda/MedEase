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
exports.StaffAppointmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const staff_appointment_subject_1 = require("./staff-appointment.subject");
let StaffAppointmentService = class StaffAppointmentService {
    constructor(staffAppointmentModel, staffAppointmentSubject) {
        this.staffAppointmentModel = staffAppointmentModel;
        this.staffAppointmentSubject = staffAppointmentSubject;
    }
    async createStaffAppointment(createStaffAppointmentDto) {
        return await this.staffAppointmentModel.create(createStaffAppointmentDto);
    }
    async getAllStaffAppointments() {
        return this.staffAppointmentModel.find().exec();
    }
    async getStaffAppointmentById(id) {
        const appointment = await this.staffAppointmentModel.findById(id).exec();
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async updateStaffAppointment(id, updateStaffAppointmentDto) {
        const updatedAppointment = await this.staffAppointmentModel
            .findByIdAndUpdate(id, updateStaffAppointmentDto, { new: true })
            .exec();
        if (!updatedAppointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        this.staffAppointmentSubject.notifyAll(updatedAppointment.patientName, updatedAppointment.doctorName, updatedAppointment.status);
        return updatedAppointment;
    }
    async deleteStaffAppointment(id) {
        const deletedAppointment = await this.staffAppointmentModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedAppointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return deletedAppointment;
    }
};
exports.StaffAppointmentService = StaffAppointmentService;
exports.StaffAppointmentService = StaffAppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('StaffAppointment')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        staff_appointment_subject_1.StaffAppointmentSubject])
], StaffAppointmentService);
//# sourceMappingURL=staff-appointment.service.js.map