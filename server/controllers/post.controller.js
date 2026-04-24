import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ImageKitService from "../services/imagekit.service.js";
import Post from '../models/post.model.js';

//create post
const createPost = asyncHandler(
    async (req, res) => {
        const{caption, tags} = req.body;
        //we will get images from req.files
        const images= req.files;
        //only image is complusory
        if(!images){
            throw new ApiError(400, "Can't create an empty post.");
        }
        //storing images
        const imageArray = [];
        for(const image of images){
            const uploaded = ImageKitService.uploadImage(
                image.buffer.toString("base64"),
                image.originalname,
                "posts"
            )
            imageArray.push({
                url: uploaded.url,
                fileId: uploaded.fileId,
            });
        }
        //post creation
        const post = await Post.create({
            caption: caption,
            tags: tags,
            images: imageArray,
            author: req.user._id
        })
        res.status(201)
        .json(
            ApiResponse(201, post ,"post create succesfully.")
        )
    }
)

//view post
const viewPost = asyncHandler(
    async(req,res)=>{

    }
)

//edit post
const editPost = asyncHandler(
    async (req,res) => {
        
    }
)

//delete post
const deletePost = asyncHandler(
    async (req,res) => {
        
    }
)

export { createPost, viewPost, editPost, deletePost }