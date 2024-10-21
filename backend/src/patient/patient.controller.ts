import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PatientDecorator } from './patient.decorator';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientDecorator: PatientDecorator) {}

  @Post()
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientDecorator.createPatient(createPatientDto);
  }

  @Get()
  async getAllPatients() {
    return this.patientDecorator.getAllPatients();
  }

  @Get(':id')
  async getPatientById(@Param('id') id: string) {
    return this.patientDecorator.getPatientById(id);
  }

  @Put(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientDecorator.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: string) {
    return this.patientDecorator.deletePatient(id);
  }
}
