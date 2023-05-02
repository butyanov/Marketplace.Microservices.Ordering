﻿import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errors = exception.getResponse()?.["message"] || exception.message;

    response.status(status).json({
      statusCode: status,
      errors: errors,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }
}
