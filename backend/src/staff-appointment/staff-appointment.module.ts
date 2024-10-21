// src/staff-appointment/staff-appointment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffAppointmentController } from './staff-appointment.controller';
import { StaffAppointmentService } from './staff-appointment.service';
import { StaffAppointmentSchema } from './staff-appointment.schema';
import { StaffAppointmentObserver } from './staff-appointment.observer';
import { StaffAppointmentSubject } from './staff-appointment.subject';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'StaffAppointment', schema: StaffAppointmentSchema },
    ]),
  ],
  controllers: [StaffAppointmentController],
  providers: [
    StaffAppointmentService,
    StaffAppointmentObserver,
    StaffAppointmentSubject,
  ],
})
export class StaffAppointmentModule {}
