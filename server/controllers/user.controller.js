import ImageKitService from "../services/imagekit.service.js";
import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import Follow from "../models/follow.model.js";
import { login } from "./auth.controller.js";

const uploadAvatar = asyncHandler(
  async (req,res) => {
    //Multer already processed the file and attached it to req.file
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }
    //req.file.buffer contains binary image data
    //req.file.originalname contains file name
 
    const uploadedImage = await ImageKitService.uploadImage(
      req.file.buffer.toString("base64"),
      req.file.originalname,
      "avatar"
    );
    const user = await User.findById(req.user.id);

    //if there is an avatar already there, and we are now updating it, 
    // so to delete the previous one we do this:
    if (user.avatar?.fileId) {
        await ImageKitService.deleteImage(user.avatar.fileId);
    }
    //and the update: 
    user.avatar = {
        url: uploadedImage.url,
        fileId: uploadedImage.fileId
    };
    await user.save({validateBeforeSave: false});
    return res.status(200).json(
      new ApiResponse(200, uploadedImage.url, "Image uploaded successfully.")
    )
  }
) 
const updatePassword= asyncHandler(
  async (req,res) => {
    
    const {oldPassword, newPassword} = req.body
    const userWithPassword = await User.findById(req.user?._id)
    const isMatch = await userWithPassword.isPasswordCorrect(oldPassword)

    if (!isMatch) {
      throw new ApiError(400, "Old password is wrong.")
    }
    if(oldPassword === newPassword){
      throw new ApiError(400, "Old password and New password cannot be same.")
    }
    userWithPassword.password = newPassword;
    await userWithPassword.save();
    return res.status(200).json(
      new ApiResponse(200, {}, "Password updated successfully.")
    )
  }
)
const updateFullName = asyncHandler(
  async (req,res) => {
    // req.user
    const name = req.body.fullName
    if(!name || name === req.user.fullName ){
      throw new ApiError(400, "Please provide with a new name.")
    }

    req.user.fullName = name;
    await req.user.save({validateBeforeSave: false});
    res.status(200).json(
      new ApiResponse(200, name, "Name updated successfully")
    )
  }
)
const updateEmail = asyncHandler(
  async (req,res) => {
    const newEmail = req.body.email
    if(!newEmail || newEmail === req.user.email){
      throw new ApiError(400, "Please provide with a new email.")
    }
    req.user.email = newEmail;
    await req.user.save({validateBeforeSave: false});
    res.status(200).json(
      new ApiResponse(200, newEmail, "Email updated successfully")
    )
  } 
)
const updateUserName = asyncHandler(
  async (req,res) => {
    const username= req.body.username;
    if(!username){
      throw new ApiError(400, "Username can not be empty.")
    }
    if(req.user.username === username){
      throw new ApiError(400, "Username is same as before. It should be new.")
    }
    req.user.username= username.toLowerCase();
    await req.user.save({validateBeforeSave: false});
    res.status(200)
    .json(
      new ApiResponse(200, req.user, "Username updated successfully.")
    )
  }
)
const updateBio = asyncHandler(
  async (req,res) => {
    const newBio = req.body.bio
    if(!newBio || newBio === req.user.bio){
      throw new ApiError(400, "Please provide with a new bio.")
    }
    req.user.bio = newBio;
    await req.user.save({validateBeforeSave: false});
    res.status(200).json(
      new ApiResponse(200, newBio, "Bio updated successfully")
    )
  }
)
const updateSocialLinks = asyncHandler(
  async (req,res) => {
    const { github, linkedin, twitter, website } = req.body;
    if(!github && !linkedin && !twitter && !website){
      throw new ApiError(400, "Please provide with at least one social link to update.")
    }
    if(github) req.user.socialLinks.github = github;
    if(linkedin) req.user.socialLinks.linkedin = linkedin;
    if(twitter) req.user.socialLinks.twitter = twitter;
    if(website) req.user.socialLinks.website = website;
    await req.user.save({validateBeforeSave: false});
    res.status(200).json(
      new ApiResponse(200, req.user.socialLinks, "Social links updated successfully")
    )
  }
)
const getUserProfile = asyncHandler(
    async (req,res) => {
        return res.status(200).json(
            new ApiResponse(200, req.user, "Current User.")
        )
    }
)
const toggleFollow = asyncHandler(async (req, res) => {

  //get id from params 
    const {id}= req.params; 

  //check if its the same as req.user._id
    //req.user._id is new ObjectId('69e9b47b74db958a0ade82e2'), we need the string only so thats why toString()

    if(req.user._id.toString() === id){
      throw new ApiError(400, "User cannot follow herself.")
    }
  //now find the target from User model
    const target = await User.findById(id); //user2 search
  //check if target exists
    if(!target){
      throw new ApiError(400, "User doesnot exists.")
    }
    let action ="followed";
    let isFollowing = true;
  //taking care of the toggle in transaction 
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();

      //check if target is in follow model
      // const exists = await Follow.findById(id); --> need to look for it using both ids
      const exists = await Follow.findOne({
        followers: req.user._id,
        following: id
      }).session(session);
      
      if(exists){
        //delete follow object
        await Follow.deleteOne({
          _id: exists._id
        }, {session})

        //dec count in both users
        await User.updateOne(
          {_id : id},
          {$inc:
              {followersCount : -1}
          },
          {session}
        )
        await User.updateOne(
          {_id : req.user._id},
          {$inc:
              {followingCount: -1}          
          },
          {session}
        )
        action= "unfollowed"
        isFollowing= false
      }

      else{
        //create a follow object
        await Follow.create(
          [{ followers: req.user._id, following: id }],
          {session}
        )
        //update both users
        //user getting followed
        await User.updateOne(
          {_id : id},
          {$inc:
              {followersCount : 1}
          },
          {session}
        )
        //user following
        await User.updateOne(
          {_id : req.user._id},
          {$inc:
              {followingCount: 1}
          },
          {session}
        )
        action= "followed"
        isFollowing= true
      }
      await session.commitTransaction(); 
    } catch (error) {
      await session.abortTransaction()
      throw new ApiError(400, "Unable to follow/unfollow.")
    }
    finally{
      await session.endSession();
    }
  
    
    return res.status(200).json(
      new ApiResponse( 200,
        {
          fullName: target.fullName,
          username: target.username,
          avatar: target.avatar,
          followersCount: target.followersCount,
          followingCount: target.followingCount,
          isFollowing,
        },
        `${req.user.username} ${action} ${target.username}`
      )
    );
  }
);
const getFollowersAndFollowing = asyncHandler(
  async (req,res) => {
    //need the count
    const {id} = req.params;
    if(!id){
      throw new ApiError(400, "User doesnot exists.")
    }
    let user;
    if(req.user._id.toString() == id){
      user = req.user;
    }
    else{
      user = await User.findById(id);
    }
    const countFollowing = user.followingCount;
    const countFollowers = user.followersCount;
    return res.status(200)
    .json(
      new ApiResponse(200, {countFollowers, countFollowing}, "SUCCESSFULLY FETCHED.")
    )
  }
)

const getFollowingList = asyncHandler(
  async (req,res) => {
    const {id} = req.params;
    if(!id){
      throw new ApiError(400, "User doesnot exists.")
    }
    const followers = await Follow.find({ following: id })
    .populate("follower", "username avatar");
     return res.status(200)
     .json(new ApiResponse(200, followers, "followers fetched successfully."));
  }
)

const getFollowersList = asyncHandler(
  async (req,res) => {
    const {id} = req.params;
    if(!id){
      throw new ApiError(400, "User doesnot exists.")
    }
    const following = await Follow.find({ followers: id })
    .populate("following", "username avatar");
     return res.status(200)
     .json(new ApiResponse(200, following, "following fetched successfully."));
  }
)

export { uploadAvatar , updatePassword , updateEmail, updateFullName , toggleFollow , updateBio, updateSocialLinks, getUserProfile, updateUserName , getFollowersAndFollowing, getFollowersList, getFollowingList }