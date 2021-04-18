import * as express from "express";
const router = express.Router()

const {register,login,resetPassword,forgotPassword} = require("../controllers/auth")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword").put(resetPassword)

module.exports = router