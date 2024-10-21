import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoDBService {
  private static instance: MongoDBService;
  private readonly logger = new Logger(MongoDBService.name);
  private dbConnection: mongoose.Connection;

  private constructor() {
    this.connect();
  }

  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }

  private async connect() {
    const mongoURI =
      'mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/csse_assaign';
    try {
      await mongoose.connect(mongoURI);
      this.dbConnection = mongoose.connection;
      this.logger.log('Successfully connected to MongoDB');
    } catch (error) {
      this.logger.error('Error connecting to MongoDB', error);
    }
  }

  public getConnection(): mongoose.Connection {
    return this.dbConnection;
  }
}
