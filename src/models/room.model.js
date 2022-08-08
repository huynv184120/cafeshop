const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = new Schema({
    members:{
        type: Array,
        default:[]
    },
    listMessageId:{
        type: Array,
        default: []
    }
}, {timestamps:true});

const RoomModel = mongoose.model("Room",Room);
module.exports = RoomModel;