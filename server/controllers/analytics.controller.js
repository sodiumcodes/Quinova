import Post from "../models/post.model.js";
import Engagement from "../models/engagement.model.js";
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
                    totalComments : { $sum: "commentsCount" },
                }
            }
        ]) 
        console.log(allCounts);
        const stats = allCounts[0] || {
            totalLikes : 0,
            totalSaves : 0,
            totalViews : 0,
            totalComments: 0
        }
        const engagementRate = (stats.totalViews === 0)? 0 : ((stats.totalLikes + stats.totalSaves + stats.commentsCount) / stats.totalViews) * 100
        
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

const getPostAnalytics = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
       
        const engagementRate = (post.viewsCount === 0) ? 0 : ((post.likesCount + post.savesCount + post.commentsCount) / post.viewsCount)*100 ; 
        await Post.updateOne({
            _id: id
            }, 
            {
                engagementRate: engagementRate
            }
        )
        return res.status(200)
        .json(
            new ApiResponse(200, {
            engagementRate: Number(engagementRate.toFixed(2))
            })
        )
    }
)

const getTopPosts = asyncHandler(
    async (req, res) => {
        const id = req.user._id;
        const topPosts = await Post.find({author: id})
                                .sort({engagementRate : -1})
                                .limit(5);
        
        if(topPosts.length < 5){
            return res.status(200)
                    .json(
                        new ApiResponse(200, "", "Kindly create more posts to see analytics.")
                    )
        }                        
        return res.status(200)
        .json(
            new ApiResponse(200, topPosts, "Top five posts Retrived succefully")
        )
    }
)

const getGrowthAnalytics = asyncHandler(async (req, res) => {
    const userPosts = await Post.find({author: req.user._id}).select("_id");
    if(userPosts.length===0){
        throw new ApiError(400, "No posts created by the user.")
    }
    const postIds = userPosts.map(p=>p._id);
    
    const growth = await Engagement.aggregate([
        {
            $match: {
                post : {$in : postIds}
            }
        },
        {
           $group: {
                _id: {
                date: {
                    $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                    }
                },
                type: "$type"
                },
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$_id.date",
                likes : {
                    $sum : {
                        $cond: [{ $eq: ["$_id.type", "like"] }, "$count", 0]
                    }
                },
                saves : {
                    $sum : {
                        $cond: [{ $eq: ["$_id.type", "save"] }, "$count", 0]
                    }
                },
                views : {
                    $sum : {
                        $cond: [{ $eq: ["$_id.type", "view"] }, "$count", 0]
                    }
                },
                comments : {
                    $sum : {
                        $cond:[{$eq: ["$_id.type", "comment"]}, "$count", 0]
                    }
                }

            }
        },
        { $sort: { _id: 1 } }
    ])
    console.log(growth);
    
    return res.json(new ApiResponse(200, growth));
});
export { getUserAnalytics , getPostAnalytics , getTopPosts , getGrowthAnalytics};