const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
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
    room: String,
    phone: String,
    role: {
        type:String,
        default:'user'
    }
}, { timestamps: true })

const UserModel = mongoose.model("User", User);
module.exports = UserModel;