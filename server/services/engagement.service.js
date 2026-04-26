import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.model.js";
import Engagement from "../models/engagement.model.js";
import { ApiError } from "../utils/ApiError.js";
//ensures only one like and one save per user is allowed
const toggleEngagement = 
  async (userId, postId, type) => {
    const session = await mongoose.startSession();
    //we are going to first find if such document already exists or not in the db using the data
    //according we will toggle the info
    try {
        session.startTransaction();
        const exists = await Engagement.findOne({
            user: userId,
            post: postId,
            type
        }).session(session);

        if (exists) {
            await Engagement.deleteOne(
                { _id: exists._id },
                { session }
            );

            await Post.updateOne(
                { _id: postId },
                { $inc: { [`${type}sCount`]: -1 } },
                { session }
            );
            await session.commitTransaction();
            return { action: "removed" };
        }

        await Engagement.create(
            [{
                user: userId,
                post: postId,
                type
            }],
            { session }
        );
        
        await Post.updateOne(
            { _id: postId },
            { $inc: { [`${type}sCount`]: 1 } },
            { session }
        );
        await session.commitTransaction();
        return { action: "added" };
    } 
    catch (error) {
        await session.abortTransaction();
        throw error;
    } 
    finally {
        session.endSession();
    }
}
//makes sure that per user the view count happens after 2mins once a post has been viewed
const viewCount = 
    async (userId, postId, type) => {
        //we are going to check if it has been 5mins or not since the post was last viewed by that user
        const recentView = await Engagement.findOne(
            {
                user: userId,
                post: postId,
                type:"view",
                createdAt: { $gt: new Date(Date.now() - 2 * 60 * 1000) } //2 mins
            })
        if(recentView){
            return { action: "ignored" }
        }
        await Engagement.create(
            {
                user: userId,
                post: postId,
                type:"view"
            },
        )
        await Post.updateOne(
            { _id : postId},
            {
                $inc: {
                    viewsCount : 1
                }
            }
        )
        return { action: "updated" }
    }

export { toggleEngagement, viewCount }