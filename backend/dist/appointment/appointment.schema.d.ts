import * as mongoose from 'mongoose';
export declare const AppointmentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    patientName: string;
    doctorName: string;
    hospital: string;
    date: NativeDate;
    status: "Pending" | "Confirmed" | "Cancelled";
    specialService?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    patientName: string;
    doctorName: string;
    hospital: string;
    date: NativeDate;
    status: "Pending" | "Confirmed" | "Cancelled";
    specialService?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    patientName: string;
    doctorName: string;
    hospital: string;
    date: NativeDate;
    status: "Pending" | "Confirmed" | "Cancelled";
    specialService?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;
