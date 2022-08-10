const asyncHandler = require('../utils/asyncHandler');
const {BadRequestError} = require('../commons/error');

const canGetUserInfo = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const credentials = user.credentials;
    if(credentials.role !== roleApp.shop 
        && roleApp.admin !== credentials.admin 
        && userId !== credentials.id){
            throw new BadRequestError({message :'not permission'});
    }
})

