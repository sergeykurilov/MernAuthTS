const mongoose = require("mongoose")

async function ConnectDB() {
     mongoose.connect(process.env.MONGO_PUBLIC_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
         useCreateIndex: true
     })
    console.log("DB connected");
};

export = ConnectDB;