const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://yamakalyan:3120@merncluster.hoxd1ij.mongodb.net/mern?retryWrites=true&w=majority",
 {useNewUrlParser : true})

try {
    mongoose.connection;
    console.log("database connected sucesfully")
} catch (error) {
    console.log(error)
}