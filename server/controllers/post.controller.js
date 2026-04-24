import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import ImageKitService from "../services/imagekit.service.js";
import Post from '../models/post.model.js';
import mongoose from "mongoose";
import User from '../models/user.model.js';

//create post
const createPost = asyncHandler(
    async (req, res) => {
        const{caption, tags} = req.body;
        //we will get images from req.files
        const images= req.files;
        if(!images){
            throw new ApiError(400, "Can't create an empty post.");
        }
        //storing images
        const imageArray = [];
        for(const image of images){
            const uploaded = await ImageKitService.uploadImage(
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
            new ApiResponse(201, post ,"post create succesfully.")
        )
    }
)

//view post -single
const viewPostById = asyncHandler(
    async(req,res)=>{
        //in post.route.js file, the parameter name was different.
        const { id } = req.params; //post id
        console.log(id);

        const post = await Post.findById(id).populate("author", "username avatar");
        console.log(post);
        
        if(!post){
            throw ApiError(404, "No post found");
        }
        return res.status(200)
            .json(new ApiResponse(200, post, "Single post"));
    }
)
const viewAllPosts = asyncHandler(
    //first get the username of the user whose post you want to see and then get its id
    //now, use Post to find all the posts by the author with that id

    async (req,res) => {
        //user id
        const { username } = req.params;
        console.log(username);

        //find returns as array not object
        // const currUser = await User.find({username})

        //findOne returns an object
        const currUser = await User.findOne({username})
        
        const posts = await Post.find({ author: currUser._id }).sort({createdAt:-1})
        
        if(posts.length===0){
            throw new ApiError(404, "No post found");
        }
        return res.status(200)
            .json(new ApiResponse(200, posts, `Posts by ${username}`));
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

export { createPost, viewPostById, viewAllPosts, editPost, deletePost }