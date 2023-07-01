const express = require("express")
const user = express.Router()
const userSchema = require("../models/usersModel")
const followingSchema = require("../models/userFollowingModel")
const jwt = require("jsonwebtoken")

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
user.get("/by/:id", async (req, res) => {
    try {
        const headerKey = process.env.JWT_HEADER
        const secureKey = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKey)
        const verify = jwt.verify(header, secureKey)

        if (verify) {
            const userID = verify.user_id
            const getUserWithId = await userSchema.findById(userID)

            res.status(200).json({
                success: true,
                message: "User found succesfully",
                getUserWithId
            })
        } else {
            res.status(500).json({
                success: false,
                error
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// PROFILE 
user.get("/user/profile", async (req, res) => {
    try {
        const headerKey = process.env.JWT_HEADER
        const secureKey = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKey)
        const verify = jwt.verify(header, secureKey)

        if (verify) {
            const userID = verify.user_id
            const profile = await userSchema.findById(userID)

            res.status(200).json({
                success: true,
                message: "User found",
                profile
            })
        } else {
            res.status(500).json({
                success: false,
                message: "InvalidToken"
            })
        }


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

        const checkingUSer = await userSchema.find({ email: req.body.email })

        if (checkingUSer.length == 0) {

            const checkingMobile = await userSchema.find({ mobile: req.body.mobile })

            if (checkingMobile.length == 0) {
                const results = await newUser.save()
                res.status(200).json({
                    success: true,
                    message: "User created succesfully",
                    results
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "User mobile already exist, Try new another",
                })
            }

        } else {
            res.status(400).json({
                success: false,
                message: "User email already exist, Try new another",
            })

        }

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

// LOGIN USER
user.post("/login", async (req, res) => {
    try {
        const check = await userSchema.find({ email: req.body.email })

        if (check.length == 0) {
            res.status(400).json({
                success: false,
                message: "Please enter correct email or Register."
            })
        } else {
            const takingPAssword = check[0].password

            if (takingPAssword == req.body.password) {

                const user = {
                    time: Date(),
                    user_id: check[0]._id,
                    name: check[0].name,
                    email: check[0].email,
                    mobile: check[0].mobile
                }

                const token = jwt.sign(user, process.env.JWT_SECREAT_KEY, { expiresIn: process.env.JWT_EXPIREIN })

                res.status(200).json({
                    success: true,
                    message: "Login succesfully",
                    check,
                    token
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Incorrect password"
                })
            }
        }

    }
    catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// AUTHENTICATION
user.post("/auth", async (req, res) => {
    try {
        const headerKey = process.env.JWT_HEADER
        const secureKey = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKey)
        const verify = jwt.verify(header, secureKey)

        if (verify) {

            const email = verify.email
            const mobile = verify.mobile
            const usercheck = await userSchema.find({ email: email, mobile: mobile })

            res.status(200).json({
                success: true,
                message: "User successfully authenicated",
                usercheck
            })

        } else {
            res.status(401).json({
                success: false,
                message: "invalidToken"
            })

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }
})

// USER FOLLOW UNFOLLOW CREATION
user.post("/following", async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {
            const checkFollowing = await followingSchema.findOne({ followinguserId: req.body.user_id })

            if (checkFollowing) {
                const removingIfExists = await followingSchema.findByIdAndDelete({ _id: checkFollowing._id })

                if (removingIfExists) {
                    res.status(200).json({
                        success: true,
                        message: "removed",
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: "troubles",
                    })
                }
            } else {
                const creatingFollowing = new followingSchema({
                    userId: verify.user_id,
                    followinguserId: req.body.user_id
                })
                const saving = await creatingFollowing.save()

                if (saving) {
                    res.status(200).json({
                        success: true,
                        message: "saved",
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: "troubles",
                    })
                }
            }
        } else {
            res.status(401).json({
                success: false,
                message: "invalidToken"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

user.get('/followlist', async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {

            const userfollow = await followingSchema.find({userId : verify.user_id})
            
            if (userfollow.length != 0) {

                res.status(200).json({
                    success: false,
                    message: "list found",
                    userfollow
                })

            } else {

                res.status(400).json({
                    success: false,
                    message: "no list",
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: "invalidToken"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

user.get('/homepage', async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)

        if (verify) {

            const postsLooping =async(id)=>{
                return new Promise((resolve, reject)=>{
                    const getUserDetails = userSchema.findOne({_id : id })

                    if (getUserDetails) {
                        resolve(getUserDetails)
                    } else {
                        reject(getUserDetails)
                        
                    }
                })
            }
            const userfollow = await followingSchema.find({userId : verify.user_id})

            if (userfollow.length != 0) {

                for (let i = 0; i < userfollow.length; i++) {
                    
                    const followingId = userfollow[i].followinguserId
                    userfollow[i].userPosts = await postsLooping(followingId)
                    
                }

                res.status(200).json({
                    success: false,
                    message: "list found",
                    userfollow
                })

            } else {

                res.status(400).json({
                    success: false,
                    message: "no list",
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: "invalidToken"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})


module.exports = user