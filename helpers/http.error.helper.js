export default class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class InvalidEntity extends HttpError {
  constructor(message) {
    super(422, message || `Invalid Entity`);
  }
}

export class NotFound extends HttpError {
  constructor(message) {
    super(404, message || `Invalid Entity`);
  }
}

export class InternalError extends HttpError {
  constructor(message) {
    super(500, message || `Something went wrong`);
  }
}
