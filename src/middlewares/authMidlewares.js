const {UnauthorizedError} = require('../commons/error');
const {verifyCredentials} = require('../utils/jwtHelper');
const verifyTokenMidlewares = asyncHandler(async (req, res, next) => {
    const bearerToken = req.headers.token;
    if(!bearerToken)throw new UnauthorizedError();
    const accessToken = bearerToken.split()[1];
    const credentials =  verifyCredentials(accessToken);
    req.credentials = credentials;
    return next();
});

module.exports = {verifyTokenMidlewares};