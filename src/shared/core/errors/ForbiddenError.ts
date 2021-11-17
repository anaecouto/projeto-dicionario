import AppError, { ErrorProps } from './AppError';

export default class ForbiddenError extends AppError {
  public constructor(message?: string, data?: ErrorProps) {
    super(message, {
      ...data,
      status: 403,
    });
  }
}
