import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Follow from '../models/follow.model.js'

const getPortfolio = asyncHandler(
    async (req, res) => {
        const {username} = req.params;
        let isFollowing = false;

        // *logged in user is seeing someone else's profile
        let user = req.user;
        if(!username === req.user.username){
            //fetch user
            user = await User.findOne({username: username});
            if (!target) {
                throw new ApiError(404, "User not found");
            }
            // *check following or not
            const follows = await Follow.exists({
                follower: req.user._id,
                following: target._id
            })
            if(follows){
                isFollowing = true;
            }
        }
        // *fetch featured posts
        const featured = await Post.find(
            { 
                author: user._id ,
                isFeatured: true
            })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("images caption engagementRate createdAt");

        let postsDisplay = [];
        if(featured.length == 5){
            postsDisplay = featured
        }
        else{
            // *Need additional posts
            const remainingSlots = 5 - featured.length;

            // !Exclude already selected featured posts
            const excludeIds = featured.map(p => p._id);

            const additionalPosts = await Post.find({
                author: user._id,
                _id: { $nin: excludeIds }
            })
            .sort({
                engagementRate: -1,
                createdAt: -1
            })
            .limit(remainingSlots)
            .select("caption images engagementRate createdAt");

            postsDisplay = [...featured, ...additionalPosts];
        }
        return res.status(200)
        .json(
            new ApiResponse(200, {
                user: {
                    fullName: user.fullName,
                    username: user.username,
                    avatar: user.avatar,
                    bio: user.bio,
                    socialLinks: user.socialLinks
                },

                stats: {
                    followers: user.followersCount,
                    following: user.followingCount,
                    posts: user.postsCount
                },
                isFollowing,
                postsDisplay
            },
            `Portfolio of ${username} fetched successfully.`)
        )
    }
)
export { getPortfolio };