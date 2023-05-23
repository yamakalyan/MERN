const mongoose = require("mongoose")

const postActions = mongoose.Schema({
    postId : {
        type :String
    },
    userId : {
        type :String
    },
    postLike : {
        type : Number
    },
    postComment : {
        type : String
    },
    postReport : {
        type :String
    }
})

module.exports = mongoose.model("postActions", postActions)