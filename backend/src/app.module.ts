import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDBService } from './mongodb.service';
import { AppointmentModule } from './appointment/appointment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LabReportModule } from './lab-report/lab-report.module';
import { StaffAppointmentModule } from './staff-appointment/staff-appointment.module';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/csse_assaign',
    ),
    AppointmentModule,
    LabReportModule,
    StaffAppointmentModule,
    PatientModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: MongoDBService,
      useFactory: () => MongoDBService.getInstance(),
    },
  ],
})
export class AppModule {}
