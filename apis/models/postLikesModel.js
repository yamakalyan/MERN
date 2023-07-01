const mongoose = require("mongoose")
const postLike = new mongoose.Schema({
    postId : 
    {
        type : String
    },
    postLike :{
        type : Number
    },
    userId : {
        type : String
    }

})

module.exports = mongoose.model("postLikes", postLike)

