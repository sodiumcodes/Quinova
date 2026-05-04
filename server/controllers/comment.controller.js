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
        //comment id
        const{id} = req.params;
        const comment = await Comment.findById({_id: id})
        //! Ownership check
        if (!comment.user.equals(req.user._id)) {
            throw new ApiError(403, "Unauthorized");
        }

        //! Time check (30 minutes)
        const now = new Date();
        const createdTime = new Date(comment.createdAt);

        const diffInMs = now - createdTime; //mili seconds -> minutes
        const diffInMinutes = diffInMs / (1000 * 60);
        //check time
        if(diffInMinutes<=30){
            const commentContent= req.body.content.trim();
            if(!commentContent){
                 throw new ApiError(400, "Edited comment cannot be blank.");
            }
            comment.content = commentContent;
            await comment.save({validateBeforeSave: false});
            return res.status(200)
            .json(new ApiResponse(200, commentContent, "Comment edited successfully."));
        }
        throw new ApiError(400, "Cannot edit after 30 minutes");
    }
)

export {createComment, removeComment, editComment};