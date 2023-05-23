const express = require("express")
const posts = express()
const postSchema = require("../models/postModel")
const postActionSchema = require("../models/postActionsModel")
const jwt = require("jsonwebtoken")


// GET ALL POSTS LIST
posts.get("/", async(req, res)=>{
    try {
        const findAll = await postSchema.find()
        res.status(200).json({
            success : true,
            message : "Successfully found all posts",
            findAll
        })
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
        const findPost = await postSchema.findById(req.params.id)

        res.status(200).json({
            success : true,
            message : "Successfully found post",
            findPost
        })

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
posts.post("/create/:user_id", async(req, res) => {
    try {
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
            userId: req.params.user_id,
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

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

// COMMENT CREATE WITH POST ID
posts.post("/action/:id", async (req, res) => {
    try {
        const check = postActionSchema.findById({postId : req.params.id})

   
        if (check.length == 0) {

            const options = new postActionSchema({
                postId: req.params.id,
                userId : req.body.user_id,
                postLike : req.body.post_like,
                postComment: req.body.post_comment,
                postReport: req.body.post_report,
            })
            //  await options.save()
            res.status(200).json({
                success : true,
                message : "created post actions",
                // saveUpdateData
            })

        } else {
            // check.postLike = req.body.post_like
            // check.postComment = req.body.post_comment
            // const saveUpdateData = await check.save()

            res.status(200).json({
                success : true,
                message : "Updated post actions",
                // saveUpdateData
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})
posts.delete("/action/delete/:id", async(req, res)=>{
    try {
        const findComment = await postActionSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success : true,
            message : "comment deleted",
            findComment
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error
        })
    }
})

// LIKE UPDATER 
posts.put("/likes/:post_id", async(req, res) => {
    try {

        const results = await postSchema.findByIdAndUpdate(req.params.post_id)
        results.postLikes = req.body.post_like;
        const updateLikes = await results.save()

        res.status(200).json({
            success : true,
            message : "updated post",
            updateLikes
        })

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