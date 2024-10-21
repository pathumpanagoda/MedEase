import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { getModelToken } from '@nestjs/mongoose';
import { Patient } from './patient.interface';
import { NotFoundException } from '@nestjs/common';

const mockPatient = {
  name: 'Alice Smith',
  contactInfo: 'alice.smith@example.com',
  medicalHistory: 'No prior conditions',
  healthcareCard: 'HC987654321',
};

// Mock model methods with `exec` method
const mockPatientModel = {
  create: jest.fn().mockResolvedValue(mockPatient),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockPatient]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockPatient),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockPatient),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockPatient),
  }),
};

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getModelToken('Patient'),
          useValue: mockPatientModel,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should create a patient', async () => {
    const result = await service.createPatient(mockPatient);
    expect(result).toEqual(mockPatient);
  });

  it('should return all patients', async () => {
    const result = await service.getAllPatients();
    expect(result).toEqual([mockPatient]);
  });

  it('should return a single patient by ID', async () => {
    const result = await service.getPatientById('1');
    expect(result).toEqual(mockPatient);
  });

  it('should update a patient', async () => {
    const result = await service.updatePatient('1', {
      contactInfo: 'alice.newemail@example.com',
    });
    expect(result).toEqual(mockPatient);
  });

  it('should delete a patient', async () => {
    const result = await service.deletePatient('1');
    expect(result).toEqual(mockPatient);
  });

  // Negative test cases
  it('should throw NotFoundException when trying to get a non-existent patient', async () => {
    mockPatientModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.getPatientById('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to update a non-existent patient', async () => {
    mockPatientModel.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(
      service.updatePatient('non-existent-id', { contactInfo: 'new@example.com' })
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to delete a non-existent patient', async () => {
    mockPatientModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.deletePatient('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should handle an error when creating a patient with invalid data', async () => {
    mockPatientModel.create.mockRejectedValueOnce(new Error('Invalid data'));

    await expect(service.createPatient({} as any)).rejects.toThrow('Invalid data');
  });
});
