class ServerError extends Error {
    constructor({ status, message, data, appStatus }) {
        super();
        this.status = status ?? 400;
        this.message = message ?? '';
        this.data = data ?? null;
        this.appStatus = appStatus ?? -3;
    }
};

class BadRequestError extends ServerError {
    constructor({ ...payload } = {}) {
        super({ status: 400, message: 'BadRequest', ...payload });
    }
};

class UnauthorizedError extends ServerError {

    constructor({ ...payload } = {}) {
        super({ status: 401, message: 'Unauthorized', ...payload });
    }
};

class ForbiddenError extends ServerError {
    constructor({ ...payload } = {}) {
        super({ status: 403, message: 'Forbidden', ...payload });
    }
};

class NotFoundError extends ServerError {
    constructor({ ...payload } = {}) {
        super({ status: 404, message: 'Not Found', ...payload });
    }
};

class InternalServerError extends ServerError {
    constructor({ ...payload } = {}) {
        super({ status: 500, message: 'Internal Server Error', ...payload });
    }
};

module.exports = {ServerError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError};