"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MongoDBService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBService = void 0;
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
let MongoDBService = MongoDBService_1 = class MongoDBService {
    constructor() {
        this.logger = new common_1.Logger(MongoDBService_1.name);
        this.connect();
    }
    static getInstance() {
        if (!MongoDBService_1.instance) {
            MongoDBService_1.instance = new MongoDBService_1();
        }
        return MongoDBService_1.instance;
    }
    async connect() {
        const mongoURI = 'mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/csse_assaign';
        try {
            await mongoose.connect(mongoURI);
            this.dbConnection = mongoose.connection;
            this.logger.log('Successfully connected to MongoDB');
        }
        catch (error) {
            this.logger.error('Error connecting to MongoDB', error);
        }
    }
    getConnection() {
        return this.dbConnection;
    }
};
exports.MongoDBService = MongoDBService;
exports.MongoDBService = MongoDBService = MongoDBService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MongoDBService);
//# sourceMappingURL=mongodb.service.js.map