import { model, Schema, Model, Document } from 'mongoose';
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpire: number;
}
export const Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide user email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide user password"],
        min: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

UserSchema.methods.matchPasswords = async function (password:string) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(25).toString("hex")
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken
}

UserSchema.pre<IUser>("save", async function (next) {
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})




const User: Model<IUser> = model("User", UserSchema)

module.exports = User;