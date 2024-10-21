import * as mongoose from 'mongoose';
export declare class MongoDBService {
    private static instance;
    private readonly logger;
    private dbConnection;
    private constructor();
    static getInstance(): MongoDBService;
    private connect;
    getConnection(): mongoose.Connection;
}
