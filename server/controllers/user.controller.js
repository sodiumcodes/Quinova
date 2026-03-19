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
export { uploadAvatar , uploadCoverImage, updatePassword , updateEmail, updateFullName }