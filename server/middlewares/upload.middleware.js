import multer from "multer";

//memoryStorage() means: The uploaded file will be stored temporarily in RAM, 
//instead of saving it to disk.
const storage = multer.memoryStorage();

//Create multer instance with configuration
const upload = multer({
  storage,
  // limit file size (5MB)
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;