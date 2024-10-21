"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSchema = void 0;
const mongoose = require("mongoose");
exports.AppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    hospital: { type: String, required: true },
    date: { type: Date, required: true },
    specialService: { type: String, required: false },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=appointment.schema.js.map