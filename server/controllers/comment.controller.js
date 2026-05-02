import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/comment.model.js"
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
        return res.status(201)
        .json(new ApiResponse(201, comment, "Comment created successfully."))
    }
)

const removeComment = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        const comment = await Comment.findByIdAndDelete({
            _id: id
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