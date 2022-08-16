const socketEvent = require("../events");
const messageService = require("../../services/message.service");
const role = require("../../commons/role");
const storage = require("../../utils/storage");
const RoomModel = require("../../models/room.model");

const sendMessage = (io, socket) => {
  socket.on(socketEvent.sendMessage, async (message) => {
    try {
      let toRoom;
      if (socket.role == role.user) {
        userService.getSupporter(socket.user_id);
        toRoom = socket.roomChat;
      }
      if (socket.role == role.shop){
        toRoom = message.to;
      }
      const  mess = await messageService.sendMessage({ from: socket.user_id, to: toRoom, content: message.content });
      io.to(toRoom).emit(socketEvent.addMessage, mess);
    } catch (err) { }
  });
};

module.exports = sendMessage;
