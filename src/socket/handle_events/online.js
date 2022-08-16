const socketEvent = require("../events");
const UserModel = require("../../models/user.model");
const { UnauthorizedError } = require("../../commons/error");
const { verifyCredentials } = require("../../utils/jwtHelper");
const storage = require('../../utils/storage');

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
        socket.join(user.room);
        if(credentials.role == 'shop'){
          storage.listShopUserOnline = [{socket, userId:credentials.id}, ...storage.listShopUserOnline];
        }
        const clients = io.sockets.adapter.rooms.get(user.room);
        console.log(user.room, clients.size);
        console.log("store" ,storage);
        socket.join(credentials.id);
        socket.join("global_room");
        console.log(socket.adapter);
      } catch (err) {
        console.log(err)   
      }
    })
  );
};

module.exports = online;
