import * as mongoose from 'mongoose';
export declare const StaffAppointmentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    patientName: string;
    doctorName: string;
    hospital: string;
    status: "Pending" | "Confirmed" | "Rejected";
    appointmentDate: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    patientName: string;
    doctorName: string;
    hospital: string;
    status: "Pending" | "Confirmed" | "Rejected";
    appointmentDate: NativeDate;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    patientName: string;
    doctorName: string;
    hospital: string;
    status: "Pending" | "Confirmed" | "Rejected";
    appointmentDate: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;
