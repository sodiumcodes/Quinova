import mongoose, {Schema} from "mongoose";
import User from "./user.model.js";
const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isDefault:{
        type: Boolean,
        default: true,
    },
    isPrivate:{
        type: Boolean,
        default: true,
    }
},
{ timestamps: true })

collectionSchema.index(
    {author:1 , isDefault:1},
    { unique: true, partialFilterExpression: { isDefault: true }}
)
const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;