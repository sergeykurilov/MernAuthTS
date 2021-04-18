import ConnectDB = require("./config/db");
require("dotenv").config({path: "./config/config.env"})
const express = require("express")
const morgan = require("morgan")
//connect DB

ConnectDB()

//app

const app = express()




/// bring routes
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth/", require("./routers/auth"))

// middlewares


//routes middleware

//port

const port = 5000

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



server.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})




