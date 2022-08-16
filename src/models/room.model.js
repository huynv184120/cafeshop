const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = new Schema({
    owner: String,
    listMessageId:{
        type: Array,
        default: []
    }
}, {timestamps:true});

const RoomModel = mongoose.model("Room",Room);
module.exports = RoomModel;