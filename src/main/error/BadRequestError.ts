import { HttpStatusCode } from './HttpStatusCode';
import { ApiError } from './ApiError';

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message);
  }

  get statusCode() {
    return HttpStatusCode.BAD_REQUEST;
  }
}
