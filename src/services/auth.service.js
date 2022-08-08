const { UserModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require('../commons/error');
const {signCredentials} = require('../utils/jwtHelper');

const authService = {
    login : async ({email, password}) => {
        const user = await UserModel.findOne({ email })
        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password);
            if (validatePassword) {
                const accessToken = signCredentials({email:user.email, id: user._id, role: user.role});
                return { success: true, token: `Bearer ${accessToken}`, "user_id": user._id };
            } else {
                throw new BadRequestError({ message: "email or password is incorrect" });
            }
        } else {
            throw new BadRequestError({ message: "email or password is incorrect" });
        }
    },
    signup :async ({email, password, username, phone}) => {

        try {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                throw new BadRequestError({ message: "email was used" });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const room = await RoomModel.create({})
                const user = await UserModel.create({
                    username: username,
                    email: email,
                    password: hashed,
                    phone:phone
                })
                user.room = room._id;
                room.members = [...room.members, user._id];
                await room.save();
                await user.save();
                return { success: true };
            }
        } catch (err) {
            throw new BadRequestError({ message: "email was used" });
        };
    }

};


module.exports = { login, signup }