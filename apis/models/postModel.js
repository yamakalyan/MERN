const mongoose = require("mongoose")

const posts = new mongoose.Schema({
    
    postHeading : {
        type: String
    },
    postText : {
        type: String
    },
    postTime : {
        type  :String
    },
    userId : {
        type : String
    }
})

module.exports = mongoose.model("post", posts)