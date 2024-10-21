"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientSchema = void 0;
const mongoose = require("mongoose");
exports.PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    medicalHistory: { type: String, required: true },
    healthcareCard: { type: String, required: true },
}, {
    timestamps: true,
});
//# sourceMappingURL=patient.schema.js.map