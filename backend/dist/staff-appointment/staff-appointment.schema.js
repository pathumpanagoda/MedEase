"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffAppointmentSchema = void 0;
const mongoose = require("mongoose");
exports.StaffAppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Rejected'],
        default: 'Pending',
    },
    hospital: { type: String, required: true },
}, {
    timestamps: true,
});
//# sourceMappingURL=staff-appointment.schema.js.map