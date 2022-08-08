const socketEvent = require("../events");
const messageService = require("../../services/message.service");

const sendMessage = (io, socket) => {
    socket.on(socketEvent.sendMessage, async (message) => {
        try{
            message.from = socket.user_id;
            const mess = await MessageModel.create(message)
            io.to(message.to).emit(socketEvent.addMessage, mess);
        }catch(err){
            
        }
    })
}

module.exports = sendMessage;