import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    avatar:{
        type: String,
        fileId: String,
        default : "",
    },
    fullName:{
        type: String,
        trim: true,
    },
    username : {
        type: String,
        lowercase: true,
        trim: true, 
        unique: true,
        default : () => Math.random().toString(36).substring(2, 10),
    },
    email: {
        type: String,
        lowercase: true,
        required : true,
        trim: true
    },
    password:{
        type: String,
        required : true,
        trim: true,
    },
    bio:{
        type: String,
        maxLength: 300,
        default: "",
    },
    socialLinks: {
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        twitter: { type: String, default: "" },
        website: { type: String, default: "" }
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    refreshToken:{
        type:String,
    },

},
{
    timestamps : true
});
//this is a middleware function
//here we cannot use anonymouse function because there we dont have access to 'this' keyword
userSchema.pre("save", async function (){

    if(!this.isModified("password")) return ;
    //encrypting the password
    this.password = await bcrypt.hash(this.password, 10);
})
//similarily we can also create our own methods

//Encapsulation and Abstraction
//All user-related logic stays inside the user model.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        _id: this._id,
        email : this.email
    },
        process.env.ACCESS_TOKEN_SECRET
    ,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET
    ,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
const User = mongoose.model("User", userSchema);
export default User;