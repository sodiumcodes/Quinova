import mongoose, { Schema } from "mongoose";
import User from "./user.model";
const subscriptionSchema = new mongoose.Schema({
    //one who is subscribing
    subscriber:{
        type: Schema.Types.ObjectId,
        ref:User,
    },
    //one who is getting subscribed
    channel:{
        type: Schema.Types.ObjectId,
        ref:User,
    }
},
{
    timestamps : true
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;