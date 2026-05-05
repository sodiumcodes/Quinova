import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
const getPostByTag = asyncHandler(
    async (req,res) => {
        //get the tag from query string
        const {tag, page =1, limit =10} = req.query;
        //check if tag is empty or not
        if(!tag){
            throw new ApiError(400, "No such tag exists");
        }
        //add # to tag
        let tagModified = "#" + tag;
        
        //With skip (proper pagination)
        let skip =( page-1 )*10;

        //we are not sorting here 
        const posts = await Post.find({tags: tagModified})
                                .skip(skip) //first 1-10 then 11-20 then 21-30 and so on
                                .limit(Number(limit))
                                .populate("author", "avatar username")
        console.log(posts);
        
        return res.status(200)
        .json(
            new ApiResponse(200, posts, "all posts with the given tag fetched.")
        )
    }
)
const searchUser = asyncHandler(
    async (req,res) => {
        const {userName, page =1, limit=10} = req.query;
        const username = userName.trim().toLowerCase();
        let user = req.user;
        if(!username === user.username ){
            user = await User.findOne({username: username});
        }
        // !pagination
        const skip = (page - 1) * limit;
        /*
         * Regex search:
         * - partial match
         * - case-insensitive 
        */
       const users = await User.find({
            username: { $regex: `^${username}`} // * starts comparing from the begining
            // * username: { $regex: username}} --> substring search 
       })
       .select("avatar username")
       .sort({username: 1})
       .skip(skip)
       .limit(Number(limit));

       return res.status(200)
       .json(
        new ApiResponse(200, users, `Search results for ${username}`)
       )
    }
)
export {getPostByTag, searchUser}