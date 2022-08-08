const asyncHandler = require("../utils/asyncHandler");
const {BadRequestError} = require("../commons/error");

const isRole = (role) => {
    return asyncHandler(async (req, res, next)=>{
        const credentials = req.credentials;
        if(credentials && credentials.role == role){
            return next();
        }
        throw new BadRequestError();
    })
} 

module.exports = {isRole};
