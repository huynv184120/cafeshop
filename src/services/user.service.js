const UserModel = require("../models/user.model");
const { NotFoundError } = require("../commons/error");
const storage = require("../utils/storage");
const userService = {
    assignRole: async (userId, role) => {
        const user = userService.findUserById(userId);
        user.role = role;
        return await user.save();
    },
    findUserById: async (userId) => {
        const user = await UserModel.findById(userId);
        if (!user) throw new NotFoundError({});
        return user;
    },
    employeeOnline: ({ socket, userId }) => {
        storage.listShopEmployeeOnline = [{ socket, userId }, ...storage.listShopEmployeeOnline];
    },
    employeeOffline: (employeeId) => {
        const keys = storage.supporter.keys().filter(key => storage.supporter[key].userId == employeeId);
        keys.forEach(key => delete storage.supporter[key]);
        storage.listShopEmployeeOnline = storage.listShopEmployeeOnline.filter((item) => item.socket.user_id != userId);
    },
    selectEmployee: () => {
        const listEmployee = storage.listShopEmployeeOnline;
        return listEmployee[Math.floor(Math.random() * listEmployee.length)];
    },
    getSupporter: (userId) => {
        if (storage.supporter[userId]) {
            return storage.supporter[userId];
        } else {
            storage.supporter[userId] = userService.selectEmployee();
        }
    }
}

module.exports = userService;