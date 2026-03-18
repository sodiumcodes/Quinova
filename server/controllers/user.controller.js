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

const changePassword= asyncHandler(
  async (req,res) => {
    console.log(req.body);
    const {oldPassword, newPassword} = req.body
    const userWithPassword = await User.findById(req.user?._id)
    const isMatch = await userWithPassword.isPasswordCorrect(oldPassword)

    if (!isMatch) {
      throw new ApiError(400, "Old password is wrong.")
    }

    const updatedUser = await User.findByIdAndUpdate(req.user?._id, {
      password : newPassword
    })
    await updatedUser.save({ validateBeforeSave : false });
    return res.status(200).json(
      new ApiResponse(200, updatedUser, "Password updated successfully.")
    )
  }
)
export {uploadAvatar , changePassword}