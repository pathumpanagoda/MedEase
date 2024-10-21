// src/staff-appointment/staff-appointment.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StaffAppointmentService } from './staff-appointment.service';
import {
  CreateStaffAppointmentDto,
  UpdateStaffAppointmentDto,
} from './staff-appointment.dto';

@Controller('staff-appointments')
export class StaffAppointmentController {
  constructor(
    private readonly staffAppointmentService: StaffAppointmentService,
  ) {}

  @Post()
  async createStaffAppointment(
    @Body() createStaffAppointmentDto: CreateStaffAppointmentDto,
  ) {
    return this.staffAppointmentService.createStaffAppointment(
      createStaffAppointmentDto,
    );
  }

  @Get()
  async getAllStaffAppointments() {
    return this.staffAppointmentService.getAllStaffAppointments();
  }

  @Get(':id')
  async getStaffAppointmentById(@Param('id') id: string) {
    return this.staffAppointmentService.getStaffAppointmentById(id);
  }

  @Put(':id')
  async updateStaffAppointment(
    @Param('id') id: string,
    @Body() updateStaffAppointmentDto: UpdateStaffAppointmentDto,
  ) {
    return this.staffAppointmentService.updateStaffAppointment(
      id,
      updateStaffAppointmentDto,
    );
  }

  @Delete(':id')
  async deleteStaffAppointment(@Param('id') id: string) {
    return this.staffAppointmentService.deleteStaffAppointment(id);
  }
}
