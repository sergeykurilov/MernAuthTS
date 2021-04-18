const nodemailer = require("nodemailer")

const sendEmail = (options) => {
    const transporter = nodemailer.createTrasport({
        service: process.env.EMAIL_SERVICE
    })
}