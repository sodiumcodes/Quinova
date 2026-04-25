import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler";
import Post from "../models/post.model";
import Engagement from "../models/engagement.model";
import { ApiError } from "../utils/ApiError";
//ensures only one like and one save per user is allowed
const toggleEngagement = asyncHandler(
    async (userId, postId, type) => {
        //session object to ensure consistency amongst the whole process
        const session = await mongoose.startSession();

        try {
            
            //we are going to first find if such document already exists or not in the db using the data
            //according we will toggle the info

            session.startTransaction();

            const exists = await Engagement.findOne(
                {
                    user: userId,
                    post : postId,
                    type
                }
            ).session(session)

            if(exists){
                await Engagement.deleteOne(
                    { _id: existing._id },
                    { session }
                )
                await Post.updateOne(
                    {
                        _id: postId
                    },
                    {
                        $inc: {[`${type}sCount`]:-1}
                    },
                    { session }
                )
                await session.commitTransaction()
                session.endSession()
                return{ action: removed }

            }
            await Engagement.create(
                [
                    {
                        user: userId,
                        post: postId,
                        type
                    }
                ],
                { session }
            )
            await Post.updateOne(
                {
                    _id: postId
                },
                {
                    $inc: {[`${type}sCount`]:1}
                },
                { session }
            )
            await session.commitTransaction();
            session.endSession();
            return { action : updated }

        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            throw error
        }
    }
)
//makes sure that per user the view count happens after 2mins once a post has been viewed
const viewCount = asyncHandler(
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
                return { action: ignored }
            }
            await Engagement.create(
                {
                     user: userId,
                    post: postId,
                    type:"view"

                },
            )
            await Post.updateOne(
                { _id : post._id},
                {
                    $inc: {
                        viewsCount : 1
                    }
                }
            )
            return { action: updated }
    }
)

export { toggleEngagement, viewCount }