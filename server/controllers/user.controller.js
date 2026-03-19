import ImageKitService from "../services/imagekit.service.js";
import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const uploadAvatar = asyncHandler(
  async (req,res) => {
    //Multer already processed the file and attached it to req.file
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }
    //req.file.buffer contains binary image data
    //req.file.originalname contains file name
 
    const uploadedImage = await ImageKitService.uploadImage(
      req.file.buffer,
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
    await user.save();
    return res.status(200).json(
      new ApiResponse(200, uploadedImage.url, "Image uploaded successfully.")
    )
  }
) 
const updatePassword= asyncHandler(
  async (req,res) => {
    console.log(req.body);
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
    if(!name){
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
    if(newEmail){
      throw new ApiError(400, "Please provide with a new email.")
    }
    req.user.email = newEmail;
    await req.user.save({validateBeforeSave: false});
    res.status(200).json(
      new ApiResponse(200, newEmail, "Email updated successfully")
    )
  } 
)
const uploadCoverImage = asyncHandler(
  async (req,res) => {
    //Multer already processed the file and attached it to req.file
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }
    //req.file.buffer contains binary image data
    //req.file.originalname contains file name
 
    const uploadedImage = await ImageKitService.uploadImage(
      req.file.buffer,
      req.file.originalname,
      "coverImage"
    );
    const user = await User.findById(req.user.id);

    //if there is an avatar already there, and we are now updating it, 
    // so to delete the previous one we do this:
    if (user.coverImage?.fileId) {
        await ImageKitService.deleteImage(user.avatar.fileId);
    }
    //and the update: 
    user.coverImage = {
        url: uploadedImage.url,
        fileId: uploadedImage.fileId
    };
    await user.save();
    return res.status(200).json(
      new ApiResponse(200, uploadedImage.url, "Image uploaded successfully.")
    )
  }
)
const getChanelProfile = asyncHandler(
  async (req,res) => {
    //get the username from the url
    const {username} = req.params

    //check if its empty 
    if(!username?.trim()){
      throw new ApiError(400, "username is missing.")
    }

    //store the count
    const channel = await User.aggregate([
      {
        //find that user
        $match : {
          username: username?.toLowerCase()
        }
      },
      {
        //find how many people are subscribed to this user
        $lookup : {
          from: "subscriptions", //alias that will stored in MongoDB
          localField: "_id",
          foreignField: "channel",
          as: "subscribers"
        }
      },
      {
        //find which channels this user is subscribed to
        $lookup : {
          from: "subscriptions", //alias that will stored in MongoDB
          localField: "_id",
          foreignField: "subscriber",
          as: "subscribedTo"
        }
      },
      {
        //adding subscribers and subscribedTo count in the object 
        //AND 
        //for frontend we have an if condition on basis of which it will show subscribed / subscribe
        $addFields : {
          
          subscribersCount: {
            $size: "$subscribers"
          },
          channelsSubscribedToCount: {
            $size: "$subscribedTo"
          },
          $isSubscribed: {
            $cond:{
              if : {$in: [req.user?._id, "$subscribers.subscriber"]},
              then : true,
              else : false
            }
          }   
        }
      },
      {
        //what all values to send as res
        $project: {
          fullName: 1,
          username: 1,
          subscribersCount: 1,
          channelsSubscribedToCount: 1,
          isSubscribed: 1,
          avatar: 1,
          coverImage: 1,
          email: 1
        }
      }
    ])

    //check if channel found
    if(!channel?.length){
      throw new ApiError(404, "Channel not found.");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    )
  }
)
export { uploadAvatar , uploadCoverImage, updatePassword , updateEmail, updateFullName , getChanelProfile}