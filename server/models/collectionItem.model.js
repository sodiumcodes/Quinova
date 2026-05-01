import mongoose, {Schema} from "mongoose";
import User from "./user.model.js";
import Post from "./post.model.js"
import Collections from "./collection.model.js";
const collectionItemSchema = new mongoose.Schema({
    collections :{
        type: Schema.Types.ObjectId,
        ref: "Collections",
        required: true,
        index: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true
    },
    note:{
        type: String,
        default: ""
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},
{ timestamps: true })

collectionItemSchema.index(
    {collections:1 , post:1},
    { unique: true}
)
const CollectionItem = mongoose.model("CollectionItem", collectionItemSchema);
export default CollectionItem;