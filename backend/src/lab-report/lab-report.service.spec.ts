import { Test, TestingModule } from '@nestjs/testing';
import { LabReportService } from './lab-report.service';
import { getModelToken } from '@nestjs/mongoose';
import { LabReport } from './lab-report.interface';
import { LabReportFactory } from './lab-report.factory';
import { LabReportStatus } from './lab-report-status';
import { NotFoundException } from '@nestjs/common';

const mockLabReport = {
  patientId: '1',
  reportDetails: 'Blood Test Results',
  doctorId: '2',
  status: LabReportStatus.PENDING,
  fileUrl: 'http://example.com/report.pdf',
};

const mockLabReportModel = {
  create: jest.fn().mockResolvedValue(mockLabReport),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockLabReport]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockLabReport),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockLabReport),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockLabReport),
  }),
};

// Mock for LabReportFactory
const mockLabReportFactory = {
  createLabReport: jest.fn().mockReturnValue(mockLabReport),
};

describe('LabReportService', () => {
  let service: LabReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabReportService,
        {
          provide: getModelToken('LabReport'),
          useValue: mockLabReportModel,
        },
        {
          provide: LabReportFactory,
          useValue: mockLabReportFactory,
        },
      ],
    }).compile();

    service = module.get<LabReportService>(LabReportService);
  });

  it('should create a lab report', async () => {
    const result = await service.createLabReport({
      patientId: '1',
      reportDetails: 'Blood Test Results',
      doctorId: '2',
      fileUrl: 'http://example.com/report.pdf',
    });
    expect(result).toEqual(mockLabReport);
    expect(mockLabReportFactory.createLabReport).toHaveBeenCalledWith(
      '1',
      'Blood Test Results',
      '2',
      'http://example.com/report.pdf',
      LabReportStatus.PENDING,
    );
  });

  it('should return all lab reports', async () => {
    const result = await service.getAllLabReports();
    expect(result).toEqual([mockLabReport]);
  });

  it('should return a single lab report by ID', async () => {
    const result = await service.getLabReportById('1');
    expect(result).toEqual(mockLabReport);
  });

  it('should update a lab report', async () => {
    const result = await service.updateLabReport('1', {
      status: 'Distributed',
    });
    expect(result).toEqual(mockLabReport);
  });

  it('should delete a lab report', async () => {
    const result = await service.deleteLabReport('1');
    expect(result).toEqual(mockLabReport);
  });

  // Negative test cases
  it('should throw NotFoundException when trying to get a non-existent lab report', async () => {
    mockLabReportModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.getLabReportById('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when trying to delete a non-existent lab report', async () => {
    mockLabReportModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.deleteLabReport('non-existent-id')).rejects.toThrow(NotFoundException);
  });

 
});