const mongoose = require("mongoose")

const connection = mongoose.connect("process.env.mongoURL")
require("dotenv").config()
module.exports={
    connection
}