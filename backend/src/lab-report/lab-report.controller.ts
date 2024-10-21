// src/lab-report/lab-report.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LabReportService } from './lab-report.service';
import { CreateLabReportDto, UpdateLabReportDto } from './lab-report.dto';

@Controller('lab-reports')
export class LabReportController {
  constructor(private readonly labReportService: LabReportService) {}

  @Post()
  async createLabReport(@Body() createLabReportDto: CreateLabReportDto) {
    return this.labReportService.createLabReport(createLabReportDto);
  }

  @Get()
  async getAllLabReports() {
    return this.labReportService.getAllLabReports();
  }

  @Get(':id')
  async getLabReportById(@Param('id') id: string) {
    return this.labReportService.getLabReportById(id);
  }

  @Put(':id')
  async updateLabReport(
    @Param('id') id: string,
    @Body() updateLabReportDto: UpdateLabReportDto,
  ) {
    return this.labReportService.updateLabReport(id, updateLabReportDto);
  }

  @Delete(':id')
  async deleteLabReport(@Param('id') id: string) {
    return this.labReportService.deleteLabReport(id);
  }
}
