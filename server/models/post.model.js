import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
        caption:{
            type:String,
            maxlength: 2200,
            default:"",
            trim:true,
        },
        images:[
            {
                url: 
                { 
                    type: String, 
                    required: true 
                },
                fileId: 
                { 
                    type: String, 
                    required: true 
                }
            }
        ],
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
        viewsCount:{
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
        engagementRate : {
            type: Number,
            default:0
        },
        isFeatured:{
            type: Boolean,
            default: false,
        } 
    },
    {
        timestamps : true
    }
);

//without index: Scan → filter → sort 
//!with index: direct lookup
postSchema.index({
    author: -1,
    isFeatured:-1,
    createdAt:-1
})
postSchema.index({
    author: -1,
    engagementRate:-1
})
const Post = mongoose.model("Post", postSchema);
export default Post;