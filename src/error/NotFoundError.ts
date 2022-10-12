import { HttpStatusCode } from './HttpStatusCode';
import { ApiError } from './ApiError';

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message);
  }

  get statusCode() {
    return HttpStatusCode.NOT_FOUND;
  }
}
