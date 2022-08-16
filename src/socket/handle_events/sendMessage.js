const socketEvent = require("../events");
const messageService = require("../../services/message.service");
const role = require("../../commons/role");
const storage = require("../../utils/storage");
const RoomModel = require("../../models/room.model");

const sendMessage = (io, socket) => {
  socket.on(socketEvent.sendMessage, async (message) => {
    try {
      message.from = socket.user_id;
      const mess = await MessageModel.create(message);
      if (socket.role == role.user) {
        const clients = io.sockets.adapter.rooms.get(socket.roomChat);
        if (clients.size < 2) {
          const socketShop =
            storage[Math.floor(Math.random() * storage.length)].socket;
          socketShop.join(socket.roomChat);
        }
      }
      io.to(message.to).emit(socketEvent.addMessage, mess);
      await RoomModel.update(
        { _id: message.to },
        { $push: { listMessageId: mess._id } }
      );
    } catch (err) {}
  });
};

module.exports = sendMessage;
