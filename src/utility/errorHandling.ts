interface ErrorType {
  message: string;
  statusCode: number;
}

class AppError extends Error {
  statusCode: number;
  constructor({ message, statusCode }: ErrorType) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super({ message: message, statusCode: 400 });
  }
}
class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized User") {
    super({ message: message, statusCode: 401 });
  }
}
class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    Error;
    super({ message: message, statusCode: 500 });
  }
}
class BadGatewayError extends AppError {
  constructor(message = "Not found") {
    super({ message: message, statusCode: 502 });
  }
}
class ServiceUnavailableError extends AppError {
  constructor(message = "Service Unavailable") {
    super({ message: message, statusCode: 503 });
  }
}
class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super({ message: message, statusCode: 404 });
  }
}

export {
  BadGatewayError,
  UnauthorizedError,
  InternalServerError,
  BadRequestError,
  ServiceUnavailableError,
  AppError,
  NotFoundError,
};
