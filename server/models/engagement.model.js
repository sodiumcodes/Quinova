import mongoose, {Schema} from "mongoose";
const engagementSchema= new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true
    },
    type:{
        type: String,
        enum: ["like", "save", "view"],
        required: true,
        default: "view"
    }
},
{ timestamps : true })

/*  
    Compound index:
    Ensures ONE like/save per user per post
*/
engagementSchema.index({
    user:1, type:1, post:1
},{
    unique:true,
    partialFilterExpression:{
        type:{$in: ["like", "save"]}
    }
})
const Engagement = mongoose.model("Engagement", engagementSchema);
export default Engagement;