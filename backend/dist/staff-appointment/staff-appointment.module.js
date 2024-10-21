"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffAppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const staff_appointment_controller_1 = require("./staff-appointment.controller");
const staff_appointment_service_1 = require("./staff-appointment.service");
const staff_appointment_schema_1 = require("./staff-appointment.schema");
const staff_appointment_observer_1 = require("./staff-appointment.observer");
const staff_appointment_subject_1 = require("./staff-appointment.subject");
let StaffAppointmentModule = class StaffAppointmentModule {
};
exports.StaffAppointmentModule = StaffAppointmentModule;
exports.StaffAppointmentModule = StaffAppointmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'StaffAppointment', schema: staff_appointment_schema_1.StaffAppointmentSchema },
            ]),
        ],
        controllers: [staff_appointment_controller_1.StaffAppointmentController],
        providers: [
            staff_appointment_service_1.StaffAppointmentService,
            staff_appointment_observer_1.StaffAppointmentObserver,
            staff_appointment_subject_1.StaffAppointmentSubject,
        ],
    })
], StaffAppointmentModule);
//# sourceMappingURL=staff-appointment.module.js.map