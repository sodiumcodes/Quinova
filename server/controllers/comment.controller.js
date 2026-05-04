import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/comment.model.js"
import Engagement from "../models/engagement.model.js";
import Post from "../models/post.model.js";
import LikeComment from "../models/commentLike.model.js";

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
        await LikeComment.create({
            user: req.user._id,
            comment: comment._id
        })
        return res.status(201)
        .json(new ApiResponse(201, comment, "Comment created successfully."))
    }
)

const removeComment = asyncHandler(
    async (req,res) => {
        //comment id
        const {id} = req.params;
        const comment = await Comment.findByIdAndDelete({
            _id: id
        }).select("post")

        await Post.findOneAndUpdate({
            _id: id
        },{
            $inc:{commentsCount: 1}
        })
        await Engagement.findOneAndDelete({
            post: comment.post,
            user: req.user._id,
        })
        await Post.findOneAndUpdate({
            _id: id
        },{
            $inc:{commentsCount: -1}
        })  
        await LikeComment.deleteOne({
            user: req.user._id,
            comment: comment._id
        })
        return res.status(204)
        .json(new ApiResponse(204, "", "Comment deleted successfully."))
    }
)

const editComment = asyncHandler(
    async (req,res) => {
        //comment id
        const{id} = req.params;
        const comment = await Comment.findOne({post: id})

        //! Ownership check
        if (!comment.createdBy == req.user._id) {
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

const toggleLikeComment = asyncHandler(
    async (req, res) => {
        //comment id
        const {id} = req.params;
        const exists = await LikeComment.findOne({comment: id});
        const session = await mongoose.startSession();
        let action;
        let updateLike;
        try{
            await session.startTransaction();
            if(exists){
                updateLike = await Comment.findByIdAndUpdate({ id },{
                    $inc: { likeCount : -1}
                }, {session}).select("content");
                
                await LikeComment.deleteOne({
                    user: req.user._id,
                    comment: id
                }, {session});
                action ="added";
            }
            else{
                updateLike = await Comment.findByIdAndUpdate({ id },{
                    $inc: { likeCount : 1}
                }, {session}).select("content");
                
                await LikeComment.create({
                    user: req.user._id,
                    comment: id
                }, {session})
                
                action= "removed";
            }
        }
        catch(error){
            session.abortTransaction();
            throw new ApiError(400, "Cannot like comment.")
        }
        finally{
            await session.endSession();
        }
        return res.status(200)
        .json(new ApiResponse(200, updateLike , `like ${action} successfully.`))
    }
)

const replyComment = asyncHandler(
    async (req, res) => {
        //we need parent id, comment content, postID
        const {id} = req.params;
        const {parentId, content} = req.body;
        const reply = await LikeComment.create({
            user: req.user._id,
            post: id
        })
        const commentCreated = await Comment.findByIdAndUpdate({
            post : id,
            parent : parentId,
            createdBy: req.user._id
        }, {
            content : content,
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
        .json(new ApiResponse(201, "", "Reply comment created."))
    }
)

const allComments = asyncHandler(
    async (req,res) => {
        //postID
        const { id } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const comments = await Comment.find({
            post:id,
            parent: null
        }).sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "username avatar");
        
        if(comments.length ==0 ){
            throw new ApiError(400, "No comments made yet.");
        }
        return res.status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully."))
    }
)
const getReplies = asyncHandler(
    async (req, res) => {
        //comment id
        const { id } = req.params;

        const replies = await Comment.find({
            parent: id
        }).sort({ createdAt: 1 })
            .populate("user", "username avatar");

        return res.status(200)
        .json(new ApiResponse(200, replies, "replies fetched succesfully"));
    }
);
export {createComment, removeComment, editComment, toggleLikeComment, replyComment, allComments , getReplies};