import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/comment.model.js"
import Engagement from "../models/engagement.model.js";
import Post from "../models/post.model.js";
const createComment = asyncHandler(
    async (req,res) => {
        //post id
        const {id} = req.params;
        if(!id){
            throw new ApiError(400, "Post doesnot exists.");
        }
        const commentContent = req.body.content.trim();
        if(!commentContent){
            throw new ApiError(400, "Comment cannot be blank.");
        }
        const comment = await Comment.create({
            post: id,
            createdBy: req.user._id,
            content: commentContent
        })
        await Engagement.create({
            user: req.user._id,
            post: id,
            type: "comment"
        })
        await Post.findOneAndUpdate({
            _id: id
        },{
            $inc:{commentsCount: 1}
        })
        return res.status(201)
        .json(new ApiResponse(201, comment, "Comment created successfully."))
    }
)

const removeComment = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        const comment = await Comment.findByIdAndDelete({
            _id: id
        }).select("post")
        await Engagement.findOneAndDelete({
            post: comment.post
        })
        await Post.findOneAndUpdate({
            _id: id
        },{
            $inc:{commentsCount: -1}
        })  
        return res.status(204)
        .json(new ApiResponse(204, "", "Comment deleted successfully."))
    }
)

const editComment = asyncHandler(
    async (req,res) => {
        
    }
)

export {createComment, removeComment, editComment};