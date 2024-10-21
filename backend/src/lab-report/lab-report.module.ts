// src/lab-report/lab-report.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabReportController } from './lab-report.controller';
import { LabReportService } from './lab-report.service';
import { LabReportSchema } from './lab-report.schema';
import { LabReportFactory } from './lab-report.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LabReport', schema: LabReportSchema }]),
  ],
  controllers: [LabReportController],
  providers: [LabReportService, LabReportFactory],
})
export class LabReportModule {}
