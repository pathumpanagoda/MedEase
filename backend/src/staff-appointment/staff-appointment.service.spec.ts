import { Test, TestingModule } from '@nestjs/testing';
import { StaffAppointmentService } from './staff-appointment.service';
import { getModelToken } from '@nestjs/mongoose';
import { StaffAppointment } from './staff-appointment.interface';
import { StaffAppointmentSubject } from './staff-appointment.subject';
import { NotFoundException } from '@nestjs/common';

// Mock data
const mockStaffAppointment = {
  patientName: 'John Doe',
  doctorName: 'Dr. Brown',
  appointmentDate: new Date(),
  hospital: 'City Hospital',
  status: 'Pending',
};

// Mock model methods with `exec` method
const mockStaffAppointmentModel = {
  create: jest.fn().mockResolvedValue(mockStaffAppointment),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockStaffAppointment]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockStaffAppointment),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockStaffAppointment),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockStaffAppointment),
  }),
};

// Mock StaffAppointmentSubject
const mockStaffAppointmentSubject = {
  notifyAll: jest.fn(), // Mock the method used in the service
};

describe('StaffAppointmentService', () => {
  let service: StaffAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffAppointmentService,
        {
          provide: getModelToken('StaffAppointment'),
          useValue: mockStaffAppointmentModel,
        },
        {
          provide: StaffAppointmentSubject,
          useValue: mockStaffAppointmentSubject,
        },
      ],
    }).compile();

    service = module.get<StaffAppointmentService>(StaffAppointmentService);
  });

  it('should create a staff appointment', async () => {
    const result = await service.createStaffAppointment(mockStaffAppointment);
    expect(result).toEqual(mockStaffAppointment);
  });

  it('should return all staff appointments', async () => {
    const result = await service.getAllStaffAppointments();
    expect(result).toEqual([mockStaffAppointment]);
  });

  it('should return a single staff appointment by ID', async () => {
    const result = await service.getStaffAppointmentById('1');
    expect(result).toEqual(mockStaffAppointment);
  });

  it('should update a staff appointment', async () => {
    const result = await service.updateStaffAppointment('1', {
      status: 'Confirmed',
    });
    expect(result).toEqual(mockStaffAppointment);
    expect(mockStaffAppointmentSubject.notifyAll).toHaveBeenCalled();
  });

  it('should delete a staff appointment', async () => {
    const result = await service.deleteStaffAppointment('1');
    expect(result).toEqual(mockStaffAppointment);
  });

  // Negative test cases
  it('should throw NotFoundException when trying to get a non-existent staff appointment', async () => {
    mockStaffAppointmentModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.getStaffAppointmentById('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to update a non-existent staff appointment', async () => {
    mockStaffAppointmentModel.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(
      service.updateStaffAppointment('non-existent-id', { status: 'Confirmed' })
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to delete a non-existent staff appointment', async () => {
    mockStaffAppointmentModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.deleteStaffAppointment('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should handle an error when creating a staff appointment with invalid data', async () => {
    mockStaffAppointmentModel.create.mockRejectedValueOnce(new Error('Invalid data'));

    await expect(service.createStaffAppointment({} as any)).rejects.toThrow('Invalid data');
  });
});
