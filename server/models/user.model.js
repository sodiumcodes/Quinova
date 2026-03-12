import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { use } from "react";
const userSchema = new mongoose.Schema({
    avatar:{
        type: String,
        public_id: String,
        required: true,
    },
    coverImage:{
        type: String,
        default : "",
    },
    fullName:{
        type: String,
        trim: true,
    },
    username : {
        type: String,
        lowercase: true,
        required : true,
        unique: true,    
        trim: true, 
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
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref : "Video"
    }],
    refreshToken:{
        type:String,
    },

},
{
    timestamps : true
});
//this is a middleware function
//here we cannot use anonymouse function because there we dont have access to 'this' keyword
userSchema.pre("save", function (next){
    //encrypting the password
    if(this.isModified("password")){
        this.password = bcrypt.hash(thhis.password, 10);
    }
    return next();
})
//similarily we can also create our own methods

//Encapsulation and Abstraction
//All user-related logic stays inside the user model.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        __id: this.__id,
        email : this.email
    },
        process.env.generateAccessToken_TOKEN_SECRET
    ,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({
        __id: this.__id,
    },
        process.env.REFRESH_TOKEN_SECRET
    ,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
const User = mongoose.model("User", userSchema);
export default User;