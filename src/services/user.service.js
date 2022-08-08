const UserModel = require("../models/user.model");
const {NotFoundError} = require("../commons/error");

const userService = {
    assignRole: async (userId, role) => {
        const user = userService.findUserById(userId);
        user.role = role;
        return await user.save();
    },
    findUserById: async (userId) => {
        const user = await UserModel.findById(userId);
        if(!user) throw new NotFoundError({});
        return user;  
    }
}

module.exports = userService;