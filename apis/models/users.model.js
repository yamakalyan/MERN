const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String
    },
    mobile : {
        type : String
    },
    password : {
        type : String
    }
})

module.exports = mongoose.model("users", user)