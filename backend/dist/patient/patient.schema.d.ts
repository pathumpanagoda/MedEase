import * as mongoose from 'mongoose';
export declare const PatientSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    contactInfo: string;
    medicalHistory: string;
    healthcareCard: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    contactInfo: string;
    medicalHistory: string;
    healthcareCard: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    contactInfo: string;
    medicalHistory: string;
    healthcareCard: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;
