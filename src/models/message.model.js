const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema({
    content:{
        type:String,
    },
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    deleted:{
        default:false,
        type:Boolean
    },
},{timestamps:true});

const MessageModel = mongoose.model("Message",Message);
module.exports = MessageModel;