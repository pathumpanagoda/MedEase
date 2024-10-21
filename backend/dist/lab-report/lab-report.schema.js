"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabReportSchema = void 0;
const mongoose = require("mongoose");
exports.LabReportSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    reportDetails: { type: String, required: true },
    doctorId: { type: String, required: true },
    fileUrl: { type: String, required: true, default: '' },
    status: {
        type: String,
        enum: ['Pending', 'Distributed'],
        default: 'Pending',
    },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
//# sourceMappingURL=lab-report.schema.js.map