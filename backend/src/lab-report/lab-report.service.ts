// src/lab-report/lab-report.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LabReport } from './lab-report.interface';
import { LabReportFactory } from './lab-report.factory';
import { CreateLabReportDto, UpdateLabReportDto } from './lab-report.dto';
import { LabReportStatus } from './lab-report-status';

@Injectable()
export class LabReportService {
  constructor(
    @InjectModel('LabReport') private readonly labReportModel: Model<LabReport>,
    private readonly labReportFactory: LabReportFactory,
  ) {}

  async createLabReport(
    createLabReportDto: CreateLabReportDto,
  ): Promise<LabReport> {
    const { patientId, reportDetails, doctorId, fileUrl } = createLabReportDto;
    const newLabReport = this.labReportFactory.createLabReport(
      patientId,
      reportDetails,
      doctorId,
      fileUrl,
      LabReportStatus.PENDING,
    );
    return this.labReportModel.create(newLabReport);
  }
  

  async getAllLabReports(): Promise<LabReport[]> {
    return this.labReportModel.find().exec();
  }

  async getLabReportById(id: string): Promise<LabReport> {
    const labReport = await this.labReportModel.findById(id).exec();
    if (!labReport) {
      throw new NotFoundException(`Lab Report with ID ${id} not found`);
    }
    return labReport;
  }

  async updateLabReport(
    id: string,
    updateLabReportDto: UpdateLabReportDto,
  ): Promise<LabReport> {
    const updatedLabReport = await this.labReportModel
      .findByIdAndUpdate(id, updateLabReportDto, { new: true })
      .exec();
    if (!updatedLabReport) {
      throw new NotFoundException(`Lab Report with ID ${id} not found`);
    }
    return updatedLabReport;
  }

  async deleteLabReport(id: string): Promise<LabReport> {
    const deletedLabReport = await this.labReportModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedLabReport) {
      throw new NotFoundException(`Lab Report with ID ${id} not found`);
    }
    return deletedLabReport;
  }
}
