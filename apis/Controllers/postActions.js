const express = require("express")
const actions = express.Router()
const jwt = require("jsonwebtoken")
const postLikeSchema = require("../models/postLikesModel")
const postCommentSchema = require("../models/postCommentModel")


actions.get("/", (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {

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

// CREATING LIKE AND DELETING IF EXISTS WITH USER ID
actions.post("/create/like", async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {

            const checkID = await postLikeSchema.find({ userId: verify.user_id, postId: req.body.post_id })

            if (checkID.length == 0) {
                const postActionCreate = new postLikeSchema({
                    postId: req.body.post_id,
                    userId: verify.user_id,
                    postLike: req.body.post_like,
                })
                const creation = await postActionCreate.save()

                res.status(200).json({
                    success: true,
                    message: "Liked",
                    creation
                })
            } else {
                const deleteLike = await postLikeSchema.findOneAndDelete({ userId: verify.user_id })

                res.status(200).json({
                    success: true,
                    message: "Removed Like",
                    deleteLike
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

// CREATING COMMENT WITH USER ID
actions.post("/create/comment", async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)

        if (verify) {

            const userID = verify.user_id

            const postActionCreate = new postCommentSchema({
                postId: req.body.post_id,
                userId: userID,
                postComment: req.body.post_comment,
            })
            const creation = await postActionCreate.save()
            if (creation) {

                res.status(200).json({
                    success: true,
                    message: "Commented",
                    creation,
                })
            } else {

                res.status(400).json({
                    success: false,
                    message: "failed",
                    creation,
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

// GET LIKES
actions.post("/likes/count", async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {

            const likes = await postLikeSchema.find({ postId: req.body.post_id })

            res.status(200).json({
                success: true,
                message: "Post likes found",
                likes: likes.length
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

// GET COMMENTS
actions.get("/comments/count", async (req, res) => {
    try {
        const headerKEy = process.env.JWT_HEADER
        const secureKEy = process.env.JWT_SECREAT_KEY

        const header = req.header(headerKEy)
        const verify = jwt.verify(header, secureKEy)
        if (verify) {

            const comments = await postCommentSchema.find()

            res.status(200).json({
                success: true,
                message: "Post comments found",
                comments: comments.length
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

module.exports = actions