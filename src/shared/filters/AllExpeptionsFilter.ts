import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { CustomCatch } from '../domain/decorators/CustomCatch';
import Logger from '../infrastructure/logger';

@CustomCatch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter')
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown & Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorId = randomUUID()

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      errorId,
      message: exception.message,
    };
    this.logger.error(exception.stack || '', responseBody)
    responseBody.message = httpStatus !== HttpStatus.INTERNAL_SERVER_ERROR ? 
      exception.message :
      'Internal server error',

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}