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
exports.StaffAppointmentController = void 0;
const common_1 = require("@nestjs/common");
const staff_appointment_service_1 = require("./staff-appointment.service");
const staff_appointment_dto_1 = require("./staff-appointment.dto");
let StaffAppointmentController = class StaffAppointmentController {
    constructor(staffAppointmentService) {
        this.staffAppointmentService = staffAppointmentService;
    }
    async createStaffAppointment(createStaffAppointmentDto) {
        return this.staffAppointmentService.createStaffAppointment(createStaffAppointmentDto);
    }
    async getAllStaffAppointments() {
        return this.staffAppointmentService.getAllStaffAppointments();
    }
    async getStaffAppointmentById(id) {
        return this.staffAppointmentService.getStaffAppointmentById(id);
    }
    async updateStaffAppointment(id, updateStaffAppointmentDto) {
        return this.staffAppointmentService.updateStaffAppointment(id, updateStaffAppointmentDto);
    }
    async deleteStaffAppointment(id) {
        return this.staffAppointmentService.deleteStaffAppointment(id);
    }
};
exports.StaffAppointmentController = StaffAppointmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_appointment_dto_1.CreateStaffAppointmentDto]),
    __metadata("design:returntype", Promise)
], StaffAppointmentController.prototype, "createStaffAppointment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffAppointmentController.prototype, "getAllStaffAppointments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffAppointmentController.prototype, "getStaffAppointmentById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_appointment_dto_1.UpdateStaffAppointmentDto]),
    __metadata("design:returntype", Promise)
], StaffAppointmentController.prototype, "updateStaffAppointment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffAppointmentController.prototype, "deleteStaffAppointment", null);
exports.StaffAppointmentController = StaffAppointmentController = __decorate([
    (0, common_1.Controller)('staff-appointments'),
    __metadata("design:paramtypes", [staff_appointment_service_1.StaffAppointmentService])
], StaffAppointmentController);
//# sourceMappingURL=staff-appointment.controller.js.map