const { UserModel } = require("../models");
const { NotFoundError, BadRequestError } = require('../commons/error');

const userService = {
    getListUser: async({ page, isPaging, pageSize, filter}) => {
        try{
            const skip = pageSize*(page-1);
            const result = await UserModel.find({filter}).limit(pageSize).skip(skip);
            const listUser = result.map(user => ({email:user.email, username:user.username, role:user.role, rooms:user.rooms}));
            return listUser;
        }catch{
            throw new BadRequestError({})
        }
    },
    getUserById: async(id) => {
        try{
            const user = await UserModel.findById(id);
            return {email:user.email, username:user.username, role:user.role, rooms:user.rooms};
        }catch{
            throw new BadRequestError({})
        }
    }
}

module.exports = userService;