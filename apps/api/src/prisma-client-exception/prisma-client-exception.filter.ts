import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  public catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2000':
        response.status(HttpStatus.BAD_REQUEST).json({
          message,
        });
        break;
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          message,
        });
        break;
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          message,
        });
        break;
      default:
        // eslint-disable-next-line promise/valid-params
        super.catch(exception, host);
        break;
    }
  }
}
