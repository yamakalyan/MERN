const mongoose = require("mongoose")
const postComment = new mongoose.Schema({
    postId : 
    {
        type : String
    },
    postComment :{
        type : String 
    },
    userId : {
        type : String
    }

})

module.exports = mongoose.model("postComments", postComment)

