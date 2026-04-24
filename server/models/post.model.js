import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
        caption:{
            type:String,
            maxlength: 2200,
            default:"",
            trim:true,
        },
        images:[{
            type: String,
            fieldId: String,
            altText: String,
        }],
        tags: [
            {
            type: String,
            lowercase: true,
            trim: true
            }
        ],
        likesCount:{
            default:0,
            type:Number,
        },
        commentsCount:{
            default:0,
            type:Number,
        },
        savesCount:{
            default:0,
            type:Number,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    {
        timestamps : true
    }
);
const Post = mongoose.model("Post", postSchema);
export default Post;