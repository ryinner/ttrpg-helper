import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/react-native.js';
import { HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn(),
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('PrismaClientExceptionFilter', () => {
  let service: PrismaClientExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientExceptionFilter],
    }).compile();

    service = module.get(PrismaClientExceptionFilter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be instance of base exception catcher', () => {
    expect(service).toBeInstanceOf(BaseExceptionFilter);
  });

  it('should catch prisma exception', () => {
    // eslint-disable-next-line promise/valid-params
    service.catch(
      new PrismaClientKnownRequestError('test error', {
        code: 'P2000',
        clientVersion: '5.17.0',
      }),
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });
});
