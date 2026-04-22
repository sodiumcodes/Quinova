import ImageKitService from "../services/imagekit.service.js";
import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

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
const getFollowingFollowers = asyncHandler(async (req, res) => {

    const { username } = req.params;

    if (!username || !username.trim()) {
        throw new ApiError(400, "Username is required");
    }

    //Find user we are trying to view
    const user = await User.findOne({
        username: username.toLowerCase()
    })
    .select("fullName username avatar followers following");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const followersCount = user.followers.length;
    const followingCount = user.following.length;

    //Check if logged-in user follows this user
    const isFollowing = user.followers.includes(req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                fullName: user.fullName,
                username: user.username,
                avatar: user.avatar,
                followersCount,
                followingCount,
                isFollowing,
            },
            "Followers and following fetched successfully"
        )
    );
});
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
export { uploadAvatar , updatePassword , updateEmail, updateFullName ,  getFollowingFollowers , updateBio, updateSocialLinks, getUserProfile }