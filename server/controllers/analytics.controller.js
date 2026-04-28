import Post from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
const getUserAnalytics = asyncHandler(
    //we will get user id from req.user
    //using id we will find all the post from that user
    //we will get all likes, views and saves
    //then 
    async (req,res) => {
        const id= req.user._id;
        const allCounts = await Post.aggregate([
            {
                $match:{
                    author: id
                }
            },
            {
                $group:{
                    _id: null,
                    totalLikes : { $sum: "likesCount" },
                    totalSaves : { $sum: "savesCount" },
                    totalViews : { $sum: "viewsCount" },
                }
            }
        ]) 
        console.log(allCounts);
        const stats = allCounts[0] || {
            totalLikes : 0,
            totalSaves : 0,
            totalViews : 0
        }
        const engagementRate = (stats.totalViews === 0)? 0 : (stats.totalLikes + stats.totalSaves) / stats.totalViews
        
        return res.status(200)
        .json(
            new ApiResponse(200, {
            followers: req.user.followersCount,
            following: req.user.followingCount,
            posts: req.user.postsCount,
            allCounts,
            engagementRate: Number(engagementRate.toFixed(2))
            })
        )
    }   
)

export { getUserAnalytics };