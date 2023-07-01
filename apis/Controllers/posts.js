const express = require("express")
const posts = express()
const postSchema = require("../models/postModel")
const postLikeSchema = require("../models/postLikesModel")
const jwt = require("jsonwebtoken")


// GET ALL POSTS LIST
posts.get("/", async(req, res)=>{

    try {
    const headerKEy = process.env.JWT_HEADER
    const secureKEy = process.env.JWT_SECREAT_KEY

    const header = req.header(headerKEy)
    const verify = jwt.verify(header, secureKEy)
    if (verify) {

            const findAll = await postSchema.find()

            const results = []

            for(const postInfo of findAll){
                const details = await postLikeSchema.findOne({postId : postInfo._id})
                results.push(postInfo)
                results.push(details)
            }
// if you make const to var and try to send response in res.json only one result will com not looped results remember.
            if (findAll.length == 0 | findAll == null| undefined ) {
                res.status(400).json({
                    success : false,
                    message : "No Posts found"
                })
            } else {
                res.status(200).json({
                    success : true,
                    message : "Found posts",
                    findAll,
                    results
                })
          
            }

    } else {
        res.status(401).json({
            success : false,
            message : "invalidToken"
        })
    }

    } catch (error) {
        res.status(500).json({
            success : false,
            error
        })
    }
})

// GET UNIQUE POST WITH POST_ID 
posts.get("/:id", async(req, res)=>{
    try {

        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY
    
        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {

            const findPost = await postSchema.findById(req.params.id)
    
           if (findPost) {
            res.status(200).json({
                success : true,
                message : "Successfully found post",
                findPost
            })
           } else {
            res.status(400).json({
                success : false,
                message : "Failed to find Posts.",
                findPost
            })
           }

        } else {
            res.status(401).json({
                success : false,
                message : "invalidToken"
            })
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            error
        })
    }
})

// GET POSTS WITH USER ID
posts.get("/user/posts", async(req, res)=>{
    try {
        const headerKey = process.env.JWT_HEADER
        const secureKey = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKey)
        const verify = jwt.verify(header, secureKey)

        if (verify){
            const id = verify.user_id
            const findPost = await postSchema.find({userId : id})

            if (findPost.length == 0) {
                
            res.status(400).json({
                success : false,
                message : "You have not posted anything.",
            })
            } else {
               
            res.status(200).json({
                success : true,
                message : "Successfully found post",
                findPost
            }) 
            }

        }else{
            res.status(401).json({
                success : false,
                message : "invalidToken"
            })
        }


    } catch (error) {
        res.status(500).json({
            success : false,
            error
        })
    }
})

// CREATE POST WITH USER ID
posts.post("/create", async(req, res) => {
    try {
    const headerKEy = process.env.JWT_HEADER
    const secureKEy = process.env.JWT_SECREAT_KEY

    const header = req.header(headerKEy)
    const verify = jwt.verify(header, secureKEy)
    if (verify) {
        const todayDate = new Date()

        var time = todayDate.getHours()
        var amPm = ""

        if (time > 12) {
            time += -12
        }
        if (amPm > 12) {
            amPm += "PM"
        } else {
            amPm += "AM"
        }
        const minates = todayDate.getMinutes()
        const dateMonthYear = todayDate.getDate() + "-" + todayDate.getMonth() + "-" + todayDate.getFullYear() + " " + time + ":" + minates + " " + amPm

        const createPost = new postSchema({
            userId: verify.user_id,
            postTime: dateMonthYear,
            postHeading: req.body.post_heading,
            postText: req.body.post_text,
        })

        const results = await createPost.save()

        res.status(200).json({
            success: true,
            message: "Succesfully created post",
            results
        })
    } else {
        res.status(401).json({
            success : false,
            message : "invalidToken"
        })
    }
       

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// UPDATE POST WITH POST ID
posts.put("/update/:post_id", async(req, res) => {
    try {

        const results = await postSchema.findByIdAndUpdate(req.params.post_id)
        results.postHeading = req.body.post_heading
        results.postText = req.body.post_text;

        const updateAndCreate = await results.save()

        res.status(200).json({
            success : true,
            message : "Succcesfully updated post",
            updateAndCreate
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// DELETE POST WITH POST ID
posts.delete("/delete/:id", async(req, res)=>{
    try {
        const findPost = await postSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success : true,
            message : "Post deleted",
            findPost
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error
        })
    }
})

module.exports = posts