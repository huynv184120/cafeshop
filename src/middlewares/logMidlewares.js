const {ServerError} = require('../commons/error');
const {failureResponse, Payload, serverErrorResponse} = require('../commons/response');
const appStatus = require('../commons/appStatus');

const logMidle = (req, res, next) => {
    console.log(req.path);
    return next();
};

module.exports = logMidle;