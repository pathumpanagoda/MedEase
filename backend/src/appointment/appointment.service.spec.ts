import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Appointment } from './appointment.interface';
import { NotFoundException } from '@nestjs/common';

const mockAppointment = {
  patientName: 'Jane Doe',
  doctorName: 'Dr. Smith',
  hospital: 'General Hospital',
  date: new Date(),
  specialService: 'Checkup',
  status: 'Pending',
};

const mockAppointmentModel = {
  create: jest.fn().mockResolvedValue(mockAppointment),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockAppointment]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockAppointment),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockAppointment),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockAppointment),
  }),
};

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getModelToken('Appointment'),
          useValue: mockAppointmentModel,
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should create an appointment', async () => {
    const result = await service.createAppointment(mockAppointment);
    expect(result).toEqual(mockAppointment);
  });

  it('should return all appointments', async () => {
    const result = await service.getAllAppointments();
    expect(result).toEqual([mockAppointment]);
  });

  it('should return a single appointment by ID', async () => {
    const result = await service.getAppointmentById('1');
    expect(result).toEqual(mockAppointment);
  });

  it('should update an appointment', async () => {
    const result = await service.updateAppointment('1', {
      status: 'Confirmed',
    });
    expect(result).toEqual(mockAppointment);
  });

  it('should delete an appointment', async () => {
    const result = await service.deleteAppointment('1');
    expect(result).toEqual(mockAppointment);
  });

  // Negative test cases
  it('should throw NotFoundException when trying to get a non-existent appointment', async () => {
    mockAppointmentModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.getAppointmentById('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to update a non-existent appointment', async () => {
    mockAppointmentModel.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(
      service.updateAppointment('non-existent-id', { status: 'Confirmed' })
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to delete a non-existent appointment', async () => {
    mockAppointmentModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.deleteAppointment('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  
});