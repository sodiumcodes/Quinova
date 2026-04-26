import asyncHandler from "../utils/asyncHandler.js";
import { toggleEngagement, viewCount } from '../services/engagement.service.js'
import Post from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const toggleLike = asyncHandler(
    async (req,res) => {
        //get post id
        const {id}= req.params;
         
        const post = await Post.findById(id);
        
        if(!post){
            throw new ApiError(404, "Post not found")
        }
        const result = await toggleEngagement(
            req.user._id,
            id,
            "like"
        );
        console.log(result);
        
        return res.json(
            new ApiResponse(200, "", `Like ${result.action}`)
        );
    }
)
const toggleSave = asyncHandler(
    async (req,res) => {
        //get post id
        const {id}= req.params;
         
        const post = await Post.findById(id);
        if(!post){
            throw new ApiError(404, "Post not found")
        }
        const result = await toggleEngagement(
            req.user._id,
            id,
            "save"
        );

        return res.json(
            new ApiResponse(200, "", `Save ${result.action}`)
        );
    }
)
const addPostView = asyncHandler(
    async (req,res) => {
        //get post id
        const {id}= req.params;
         
        const post = await Post.findById(id);
        if(!post){
            throw new ApiError(404, "Post not found")
        }
        const result = await viewCount(req.user._id, id, "view")
        
        return res.json(
            new ApiResponse(200, "", `View ${result.action}`)
        );
    }
)

export { toggleLike, toggleSave , addPostView }