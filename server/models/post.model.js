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
        commentsCount:{
            default: 0,
            type: Number
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
postSchema.index({ tags: 1 });

//only lowercase tags allowed
postSchema.pre("save", function () {
    if (this.tags && Array.isArray(this.tags)) {
        this.tags = this.tags
            .flatMap(tag =>
                tag.split(/\s+/) // split by spaces 
            )//return [elements] in one level (flatens array)
            .filter(tag => tag.length > 0) // remove empty
            .map(tag => tag.toLowerCase().trim()); // normalize
    }
    
});

//to understand map and flat map better
/*
    let array = ["abc bcd cde", "def efg fgh"];
    console.log(array.map(a=>a.split(/\s+/)));
    console.log(array.flatMap(a=>a.split(/\s+/)));
*/
const Post = mongoose.model("Post", postSchema);
export default Post;