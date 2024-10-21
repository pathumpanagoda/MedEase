// src/staff-appointment/staff-appointment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaffAppointment } from './staff-appointment.interface';
import {
  CreateStaffAppointmentDto,
  UpdateStaffAppointmentDto,
} from './staff-appointment.dto';
import { StaffAppointmentSubject } from './staff-appointment.subject';

@Injectable()
export class StaffAppointmentService {
  constructor(
    @InjectModel('StaffAppointment')
    private readonly staffAppointmentModel: Model<StaffAppointment>,
    private readonly staffAppointmentSubject: StaffAppointmentSubject,
  ) {}


  async createStaffAppointment(
    createStaffAppointmentDto: CreateStaffAppointmentDto,
  ): Promise<StaffAppointment> {
    return await this.staffAppointmentModel.create(createStaffAppointmentDto);
  }
  

  async getAllStaffAppointments(): Promise<StaffAppointment[]> {
    return this.staffAppointmentModel.find().exec();
  }

  async getStaffAppointmentById(id: string): Promise<StaffAppointment> {
    const appointment = await this.staffAppointmentModel.findById(id).exec();
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async updateStaffAppointment(
    id: string,
    updateStaffAppointmentDto: UpdateStaffAppointmentDto,
  ): Promise<StaffAppointment> {
    const updatedAppointment = await this.staffAppointmentModel
      .findByIdAndUpdate(id, updateStaffAppointmentDto, { new: true })
      .exec();
    if (!updatedAppointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    // Notify observers of the status change
    this.staffAppointmentSubject.notifyAll(
      updatedAppointment.patientName,
      updatedAppointment.doctorName,
      updatedAppointment.status,
    );
    return updatedAppointment;
  }

  async deleteStaffAppointment(id: string): Promise<StaffAppointment> {
    const deletedAppointment = await this.staffAppointmentModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedAppointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return deletedAppointment;
  }
}
