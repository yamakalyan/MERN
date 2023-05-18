const express = require("express")
const user = express.Router()
const userSchema = require("../models/users.model")

// LIST OF USERS
user.get("/", async (req, res) => {
    try {

        const data = await userSchema.find()

        res.status(200).json({
            success: true,
            message: "Succesfully found users list",
            data
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// UNIQUE USER WITH PARAMS ID
user.get("/:id", async (req, res) => {
    try {
        const getUserWithId = await userSchema.findById(req.params.id)

        res.status(200).json({
            success: true,
            message: "User found succesfully",
            getUserWithId
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// USER CREATION
user.post("/create", async (req, res) => {
    try {
        const newUser = new userSchema({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        })

        const results = await newUser.save()

        res.status(200).json({
            success: true,
            message: "User created succesfully",
            results
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// USER UPDATE WITH PARAMS ID
user.put("/update/:id", async (req, res) => {
    try {
        const updateUser = await userSchema.findByIdAndUpdate(req.params.id)

        updateUser.name = req.body.name
        updateUser.mobile = req.body.mobile
        updateUser.email = req.body.email
        updateUser.password = req.body.password

        const data = await updateUser.save()

        res.status(200).json({
            success: true,
            message: "User updated succesfully",
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// USER DELETE WITH PARAMS ID
user.delete("/delete/:id", async (req, res) => {
    try {
        const deleteUser = await userSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "user deleted succesfully",
            deleteUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})


module.exports = user