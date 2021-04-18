import {NextFunction, Request, Response} from "express";

const ErrorResponse = require("../utils/ErrorResponse")

interface ErrorResponse {
    message: string,
    statusCode: number,
    code: number
    errors: ErrorResponse
    name: string
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    let error = {...err}
    error.message = err.message

    if(err.code === 11000){
        const message = "Duplicate Field Value Enter"
        error = new ErrorResponse(message, 400)

    }
    if(err.name = "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(400).json({
        success: false,
        error: error.message || "Server Error"
    })
}

module.exports = errorHandler