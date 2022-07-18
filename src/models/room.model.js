const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = new Schema({
    roomname:{
        type:String,
        default:"",
    },
    avartar: {
        type: String,
        default: ""
    },
    creator:{
        type:String,
        required:true
    },
    members:{
        type: Array,
        default:[]
    },
    invitedUsers:{
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