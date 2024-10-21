"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffAppointmentSubject = void 0;
const common_1 = require("@nestjs/common");
let StaffAppointmentSubject = class StaffAppointmentSubject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    notifyAll(patientName, doctorName, status) {
        this.observers.forEach((observer) => observer.notify(patientName, doctorName, status));
    }
};
exports.StaffAppointmentSubject = StaffAppointmentSubject;
exports.StaffAppointmentSubject = StaffAppointmentSubject = __decorate([
    (0, common_1.Injectable)()
], StaffAppointmentSubject);
//# sourceMappingURL=staff-appointment.subject.js.map