"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.AppError = exports.ServiceUnavailableError = exports.BadRequestError = exports.InternalServerError = exports.UnauthorizedError = exports.BadGatewayError = void 0;
class AppError extends Error {
    constructor({ message, statusCode }) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super({ message: message, statusCode: 400 });
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized User") {
        super({ message: message, statusCode: 401 });
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        Error;
        super({ message: message, statusCode: 500 });
    }
}
exports.InternalServerError = InternalServerError;
class BadGatewayError extends AppError {
    constructor(message = "Not found") {
        super({ message: message, statusCode: 502 });
    }
}
exports.BadGatewayError = BadGatewayError;
class ServiceUnavailableError extends AppError {
    constructor(message = "Service Unavailable") {
        super({ message: message, statusCode: 503 });
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
class NotFoundError extends AppError {
    constructor(message = "Not found") {
        super({ message: message, statusCode: 404 });
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=errorHandling.js.map