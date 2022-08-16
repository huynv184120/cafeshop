const {ServerError} = require('../commons/error');
const {failureResponse, Payload, serverErrorResponse} = require('../commons/response');
const appStatus = require('../commons/appStatus');

const handleAPIError = (err, req, res, next) => {
    console.log(err);
    if (err) {
        if (err instanceof ServerError) {
            const {status, message, data, appStatus} = err;
            const payload = new Payload({data, appStatus, message})
            if (status === 200) return failureResponse(res, payload);
            return serverErrorResponse(res, status, payload);
        }
        return serverErrorResponse(res, 500, new Payload({
            message: 'Internal Server Error',
            appStatus: appStatus.UNDEFINED_ERROR
        }));
    }
    return next();
};

const handleNotFoundError = (req, res, next) => {
    serverErrorResponse(res, 404, new Payload({
        message: `Endpoint ${req.method} ${req.url} not found`,
        appStatus: appStatus.UNDEFINED_ERROR
    }));
    return next();
};

module.exports = {handleAPIError, handleNotFoundError};
