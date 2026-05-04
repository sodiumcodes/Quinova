import mongoose, { Schema } from 'mongoose'
const commentSchema = new mongoose.Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content:{
        type: String,
        maxLength: 500,
        required: true,
        trim: true,
    },
    parent:{
        type: Schema.Types.ObjectId,
        rref: "Comment",
        default: null,
        index: true,
    },
    likeCount:{
        type:Number,
        default: 0,
    }
}, {
    timestamps: true
})

// *Index for fast fetching (post comments sorted by latest)

commentSchema.index({ post: 1, parent: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;