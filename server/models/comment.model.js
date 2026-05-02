import mongoose, { Schema } from 'mongoose'
const commentSchema = new mongoose.Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
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
    }
})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;