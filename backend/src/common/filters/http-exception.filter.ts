import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

interface NestExceptionPayload {
    message?: string | string[];
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();

            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const payload = exceptionResponse as NestExceptionPayload
                message = payload.message ?? exception.message;
            }
        }

        if (!(exception instanceof HttpException)) {
            this.logger.error(exception);
        }

        response.status(status).json({
            status: "error",
            message: Array.isArray(message) ? message[0] : message,
            errorDetails: {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                allErrors: Array.isArray(message) ? message : [message]
            }
        })
    }
}