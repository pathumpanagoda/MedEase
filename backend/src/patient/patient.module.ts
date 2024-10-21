// src/patient/patient.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientSchema } from './patient.schema';
import { PatientLogger } from './patient.logger';
import { PatientDecorator } from './patient.decorator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService, PatientLogger, PatientDecorator],
})
export class PatientModule {}
