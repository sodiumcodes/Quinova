import mongoose, {Schema} from "mongoose";
import User from "./user.model.js";
const collectionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isDefault:{
        type: Boolean,
        default: false,
    },
    isPrivate:{
        type: Boolean,
        default: true,
    }
},
{ timestamps: true })

collectionsSchema.index(
    {author:1 , isDefault:1},
    { unique: true, partialFilterExpression: { isDefault: true }}
)
const Collections = mongoose.model("Collections", collectionsSchema);
export default Collections;