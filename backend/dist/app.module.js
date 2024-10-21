"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongodb_service_1 = require("./mongodb.service");
const appointment_module_1 = require("./appointment/appointment.module");
const mongoose_1 = require("@nestjs/mongoose");
const lab_report_module_1 = require("./lab-report/lab-report.module");
const staff_appointment_module_1 = require("./staff-appointment/staff-appointment.module");
const patient_module_1 = require("./patient/patient.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/csse_assaign'),
            appointment_module_1.AppointmentModule,
            lab_report_module_1.LabReportModule,
            staff_appointment_module_1.StaffAppointmentModule,
            patient_module_1.PatientModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: mongodb_service_1.MongoDBService,
                useFactory: () => mongodb_service_1.MongoDBService.getInstance(),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map