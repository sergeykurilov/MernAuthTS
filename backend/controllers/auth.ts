const User = require("../models/User")


exports.register = async (req, res, next) => {
    const {username, email, password} = req.body
    try {
        const user = await User.create({
            username, email, password
        })
        res.status(201).json({
            success: true,
            user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({
            success: false,
            error: "User and Password are required"
        })
    }

    try{
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            })
        }
        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            return res.status(400).json({
                success: false,
                error: "Invalid username or password"
            })
        }
        res.status(200).json({
            success: true,
            token: "aksdmakdmakdmk",
        })
    }catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password Route")
}

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route")
}