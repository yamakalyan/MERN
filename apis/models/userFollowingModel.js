const mongoose = require("mongoose")

const following = mongoose.Schema({
    userId : {
        type : String
    },
    followinguserId : {
        type : String
    }
})

module.exports = mongoose.model("userFollowing", following)