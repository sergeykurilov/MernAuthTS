import {NextFunction} from "express";

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')

type AuthorizedRequest = Express.Request & { user: any, headers: { authorization: string } };

exports.protect = async function (req: AuthorizedRequest, res: Response, next: NextFunction) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = User.findById(decoded.id)
        if (!user) {
            return next(new ErrorResponse("No user found for that ID", 404))
        }
        req.user = user
        next()
    } catch (e) {
        return next(new ErrorResponse("No authorized to access this route", 401))
    }

}

