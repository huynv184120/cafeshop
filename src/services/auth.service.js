const { UserModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError, BadRequestError } = require('../commons/error');


const authService = {
    login : async (email, password) => {
        const user = await UserModel.findOne({ email })
        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password);
            if (validatePassword) {
                const accessToken = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, process.env.SECRETKEY_JWT_TOKEN,
                    { expiresIn: "1d" });
                return { success: true, token: `Bearer ${accessToken}`, "user_id": user._id };
            } else {
                throw new BadRequestError({ message: "email or password is incorrect" });
            }
        } else {
            throw new BadRequestError({ message: "email or password is incorrect" });
        }

    },
    signup :async (req, res, email,password, username) => {

        try {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                throw BadRequestError({ message: "email was used" });
            }
            else {
    
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                UserModel.create({
                    username: username,
                    email: email,
                    password: hashed
                }).then(data => {
                    return { success: true };
                })
            }
        } catch (err) {
            throw new BadRequestError({ message: "email was used" });
        };
    }

};


module.exports = { login, signup }