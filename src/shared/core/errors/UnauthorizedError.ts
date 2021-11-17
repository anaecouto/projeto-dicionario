import AppError, { ErrorProps } from './AppError';

export default class UnauthorizedError extends AppError {
  public constructor(message?: string, data?: ErrorProps) {
    super(message, {
      ...data,
      status: 401,
    });
  }
}
