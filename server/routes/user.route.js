import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import 
{ uploadAvatar , updatePassword , updateEmail, 
updateFullName ,  getFollowingFollowers , getWatchHistory }  
from "../controllers/user.controller.js";

const router = express.Router();
router.route("/upload-avatar").patch(verifyUser, upload.single("avatar") , uploadAvatar ); //ok
router.route("/update-fullName").patch(verifyUser, updateFullName ) //ok
router.route("/update-email").patch(verifyUser, updateEmail ) //ok
router.route("/update-password").patch(verifyUser, updatePassword ) //ok

router.route("/follow/:username").get(verifyUser,  getFollowingFollowers); //ok
router.route("/watch-history").get(verifyUser, getWatchHistory); //ok

export default router;