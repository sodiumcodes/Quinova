import asyncHandler from "../utils/asyncHandler.js";
import { toggleEngagement, viewCount } from '../services/engagement.service.js'
import Post from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";

const toggleLike = asyncHandler(
    async (req,res) => {
        //get post id
        const {_id}= req.params;
         
        const post = await Post.findOne(_id);
        if(!post){
            throw new ApiError(404, "Post not found")
        }
        const result = await toggleEngagement({
            userId: req.user._id,
            postId: _id,
            type: "like"
        });

        return res.json(
            new ApiResponse(200, "", `Like ${result.action}`)
        );
    }
)
const toggleSave = asyncHandler(
    async (req,res) => {
        //get post id
        const {_id}= req.params;
         
        const post = await Post.findOne(_id);
        if(!post){
            throw new ApiError(404, "Post not found")
        }
        const result = await toggleEngagement({
            userId: req.user._id,
            postId: _id,
            type: "save"
        });

        return res.json(
            new ApiResponse(200, "", `Save ${result.action}`)
        );
    }
)
const addPostView = asyncHandler(
    async (req,res) => {
        //get post id
        const {_id}= req.params;
         
        const post = await Post.findOne(_id);
        if(!post){
            throw new ApiError(404, "Post not found")
        }
        const result = await viewCount({
            userId: req.user._id,
            postId: _id,
            type: "view"
        });

        return res.json(
            new ApiResponse(200, "", `View ${result.action}`)
        );
    }
)

export { toggleLike, toggleSave , addPostView }