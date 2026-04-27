import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
const followSchema = new mongoose.Schema(
    {
        //the one who is following
        followers:{
            type: Schema.Types.ObjectId,
            ref:User,
            required: true,
            index: true,

        },
        //one who is getting subscribed
        following:{
            type: Schema.Types.ObjectId,
            ref:User,
            required: true,
            index: true,
        }
    },
    {timestamps:true}
)
followSchema.index(
  { follower: 1, following: 1 },
  { unique: true }
);
const Follow = mongoose.model("Follow", followSchema);
export default Follow;