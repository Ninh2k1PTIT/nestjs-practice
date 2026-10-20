import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { SkipLog } from 'src/common/decorators/skip-log.decorator';
import { RequestLogsService } from 'src/modules/request-logs/request-logs.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly requestLogsService: RequestLogsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const skip = this.reflector.getAllAndOverride(SkipLog, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) {
      return next.handle();
    }

    const start = performance.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.requestLogsService
            .create({
              url: request.originalUrl,
              ip: request.ip,
              method: request.method,
              statusCode: response.statusCode,
              duration: performance.now() - start,
              requestBody: request.body,
              response: data ? JSON.stringify(data) : undefined,
            })
            .catch();
          this.logger.log(
            `${request.method} ${request.originalUrl} ${response.statusCode}`,
          );
        },
        error: (err) => {
          const statusCode =
            err instanceof HttpException
              ? err.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;
          this.requestLogsService
            .create({
              url: request.originalUrl,
              ip: request.ip,
              method: request.method,
              statusCode: statusCode,
              duration: performance.now() - start,
              requestBody: request.body,
            })
            .catch();
          this.logger.error(
            `${request.method} ${request.originalUrl} ${statusCode}`,
            err?.stack,
          );
        },
      }),
    );
  }
}
