import { HttpStatusCode } from './HttpStatusCode';

export class ApiError extends Error {
  get name() {
    return this.constructor.name;
  }

  get statusCode() {
    return HttpStatusCode.INTERNAL_SERVER;
  }
}
