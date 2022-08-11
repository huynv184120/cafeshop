const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError, BadRequestError } = require('../commons/error');
const {signCredentials} = require('../utils/jwtHelper');

const authService = {
    login: async ({ email, password }) => {
        const user = await UserModel.findOne({ email })
        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password);
            if (validatePassword) {
                const accessToken = signCredentials({
                    email: user.email,
                    id: user._id,
                    role: user.role,
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
    signup: async ({ email, password, phone }) => {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            throw new BadRequestError({ message: "email was used" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            UserModel.create({
                email: email,
                phone: phone,
                password: hashed
            }).then(data => {
                return { success: true };
            })
        }
    }
};


module.exports = authService;