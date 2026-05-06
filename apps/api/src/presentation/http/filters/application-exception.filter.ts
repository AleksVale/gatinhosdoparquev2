import { ArgumentsHost, BadRequestException, Catch, ConflictException, ExceptionFilter, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from '../../../application/errors/application-error';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter<ApplicationError> {
  catch(exception: ApplicationError, host: ArgumentsHost): void {
    const httpException = this.toHttpException(exception);
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = httpException.getStatus();

    response.status(statusCode).json({ statusCode, message: exception.message, error: httpException.name.replace('Exception', '') });
  }

  private toHttpException(exception: ApplicationError) {
    if (exception.code === 'bad_request') {
      return new BadRequestException(exception.message);
    }

    if (exception.code === 'conflict') {
      return new ConflictException(exception.message);
    }

    if (exception.code === 'not_found') {
      return new NotFoundException(exception.message);
    }

    return new UnauthorizedException(exception.message);
  }
}
