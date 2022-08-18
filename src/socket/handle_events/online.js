const socketEvent = require("../events");
const UserModel = require("../../models/user.model");
const { UnauthorizedError } = require("../../commons/error");
const { verifyCredentials } = require("../../utils/jwtHelper");
const userService = require("../../services/user.service");

const online = (io, socket) => {
  socket.on(
    socketEvent.online,
    (async (req) => {
      try {
        const bearerToken = req.token;
        if (!bearerToken) throw new UnauthorizedError();
        const accessToken = bearerToken.split(' ')[1];
        const credentials = verifyCredentials(accessToken);
        socket.user_id = credentials.id;
        socket.role = credentials.role;
        const user = await UserModel.findById(credentials.id);
        socket.roomChat = user.room;
        if(credentials.role == 'user'){
          userService.getSupporter(credentials.id)?.socket?.join(user.room);
          socket.join(user.room);
        }
        if(credentials.role == 'shop'){
          userService.employeeOnline({socket, userId:credentials.id});
          socket.join("shop_room");
        }
        socket.join(credentials.id);
        socket.join("global_room");
      } catch (err) {
        console.log("98765234567")

        console.log(err)   
      }
    })
  );
};

module.exports = online;
