import mongoose, { Schema } from 'mongoose'
const likecommentSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
        index: true
    },
    parent:{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
        index: true,
        default: null,
    }
})

// *Index for fast fetching (post comments sorted by latest)

likecommentSchema.index({ user: 1, comment: 1, createdAt: -1 });

const LikeComment = mongoose.model("LikeComment", likecommentSchema);
export default LikeComment;