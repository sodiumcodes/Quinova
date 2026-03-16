import ImageKitService from "../services/imagekit.service.js";
import User from '../models/user.model.js'
export const uploadAvatar = async (req, res) => {
  try {
    //Multer already processed the file and attached it to req.file
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
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
    res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadedImage.url
    });
  } 
  catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
};
export {uploadAvatar}