import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma known request errors
      // Customize the message based on the error code if needed
      status = HttpStatus.BAD_REQUEST;
      message = 'Database error';
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown database error';
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database panic error';
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database initialization error';
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Database validation error';
    } else if(exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Database validaiton error'
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
