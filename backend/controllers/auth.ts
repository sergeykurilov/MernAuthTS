import ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User")

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body
    try {
        const user = await User.create({
            username, email, password
        })
        sendToken(user, 200, res)
    } catch (e) {
       next(e)
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorResponse("Please provide valid email and password",400))
    }

    try{
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorResponse("Invalid email or password",401))
        }
        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            return next(new ErrorResponse("Invalid email or password",401))
        }
        sendToken(user, 201, res)
    }catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

exports.forgotPassword = async (req, res, next) => {
    const {email} = req.body
    try {
        const user = User.findOne({email})
        if(!user){
            return next(new ErrorResponse("Email could not be sent",404))
        }
        const resetToken = user.getResetPasswordToken()
        await user.save()

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
        const message = `
            <h1>You have requested a password request</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=false>${resetUrl}</a>
        `
        try{

        }catch (error) {

        }
    }catch (e) {

    }
}

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route")
}


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({
        success: true,
        token
    })
}