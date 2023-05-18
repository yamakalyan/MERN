const mongoose = require("mongoose")
const env = require("dotenv")

env.config()

mongoose.connect(process.env.URL,
 {useNewUrlParser : true})

try {
    mongoose.connection;
    console.log("database connected sucesfully")
} catch (error) {
    console.log(error)
}