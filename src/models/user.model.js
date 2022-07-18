const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        default: ""
    },
    rooms:{
        type: Array,
        default:[]
    },
    online:{
        type:Boolean,
        default:false
    },
    role: {
        type:Number,
        default:0
    }
}, { timestamps: true })

const UserModel = mongoose.model("User", User);

module.exports = UserModel;