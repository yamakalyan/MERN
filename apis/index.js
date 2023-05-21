const express = require("express")
const app = express()
const env = require("dotenv")
const db = require("./Database/mongoDb")
const users = require("./Controllers/users")
const cors = require("cors")

app.use(cors({origin : "*"}))
env.config()

app.listen(3500, (err, results)=>{
    if (err) {
        console.log("App not responding")
    } else {
        console.log("App responding succesfully.")
    }
})

app.use(express.json())

app.use("/user", users)
