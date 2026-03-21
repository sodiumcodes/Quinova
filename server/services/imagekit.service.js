import imagekit from "../configs/imagekit.config.js";
class ImageKitService {
//This function uploads image to ImageKit

static async uploadImage(fileBuffer, fileName, folder="") {
    try {
      /* imagekit.upload sends file to ImageKit servers*/
      const response = await imagekit.files.upload({
        file: fileBuffer,     
        fileName: fileName, 
        folder: `youtube_backend/${folder}`       // folder inside ImageKit
      });

      return {
        url: response.url,
        fileId: response.fileId //needed while deleting
      };
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  }
  static async deleteImage(fileId){
    try{
      await imagekit.files.delete(fileId);
    }
    catch(error){
      throw error;
    }
  }
}

export default ImageKitService;