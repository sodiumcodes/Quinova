import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import 
{ uploadAvatar , uploadCoverImage, updatePassword , updateEmail, 
updateFullName , getChanelProfile , getWatchHistory }  
from "../controllers/user.controller.js";

const router = express.Router();
router.route( "/upload-avatar").patch(verifyUser, upload.single("avatar") , uploadAvatar );
router.route("/upload-coverImage").patch(verifyUser, upload.single("coverImage"), uploadCoverImage )
router.route("/update-fullName").patch(verifyUser, updateFullName )
router.route("/update-email").patch(verifyUser, updateEmail )
router.route("/update-password").patch(verifyUser, updatePassword )

router.route("/c/:username").get(verifyUser, getChanelProfile);
router.route("/watch-history").get(verifyUser, getWatchHistory);

export default router;