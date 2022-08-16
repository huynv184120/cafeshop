const RoomModel = require("../models/room.model");
const MessageModel = require("../models/message.model");
const { NotFoundError, BadRequestError } = require("../commons/error");

const messageService = {
    getListMessageInRoom : async({roomId, page, isPaging=true, pageSize}) => {
        const room = (await RoomModel.findById(roomId));
        const skip = pageSize * (page - 1);
        if(skip >= room.listMessageId.length){
            throw new NotFoundError({});
        }
        const end = (skip + pageSize) > room.listMessageId.length ?  room.listMessageId.length : (skip + pageSize);
        const listMessageId = room.listMessageId.reverse().slice(skip, end);
        const listMessage = listMessageId.map((id) => MessageModel.findById(id));
        return await Promise.all(listMessage);
    },
    sendMessageToRoom : async ({from, to, content}) => {
        const mess = await MessageModel.create({to, from, content});
        if(!mess) throw new BadRequestError({});
        await RoomModel.updateOne({_id:to}, {$push: {listMessageId: mess._id}});
        return mess;
    },
}
module.exports = messageService;