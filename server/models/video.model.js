import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tile:{
        type: String,
        required : true,   
        trim: true, 
    },
    description:{
        type: String,  
        trim: true, 
    },
    thumbnail:{
        type: String,
        required : true, 
    },
    videoFile:{
        type: String, 
        required: true
    },
    duration:{
        type: Number, 
        required: true
    },
    views:{
        type: Number, 
        default: 0
    },
    isPublished:{
        type:Boolean,
        default: false,
    },
    //mux setup for video upload and stream
    muxAssetId: {
        type: String,
        required: true,
    },

    muxPlaybackId: {
        type: String,
        required: true,
    },
},
{
    timestamps : true
});
videoSchema.plugin(mongooseAggregatePaginate )
const Video = mongoose.model("Video", videoSchema);
export default Video;