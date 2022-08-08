const jwt = require("jsonwebtoken");
const {JsonWebTokenError} = require("jsonwebtoken");
const {Credentials} = require('../commons/request');
const {UnauthorizedError} = require('../commons/error');

const signCredentials = ({email, id, role}) => {
    const accessToken = jwt.sign({
        email: email,
        id: id,
        role: role,
    }, process.env.SECRETKEY_JWT_TOKEN,
        { expiresIn: "1d" });
    return accessToken;
}

const verifyCredentials = (accessToken) => {
    try{
        const credentials = new Credentials(jwt.verify(accessToken, process.env.SECRETKEY_JWT_TOKEN));
        return credentials;
    }catch(e){
        if (e instanceof JsonWebTokenError) {
            throw new UnauthorizedError({message: 'Token Expired'});
        }
        throw new UnauthorizedError();
    }
}

module.exports = {signCredentials, verifyCredentials};