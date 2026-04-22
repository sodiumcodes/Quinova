import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import 
{ uploadAvatar , updatePassword , updateEmail, updateFullName ,  getFollowingFollowers , updateBio, updateSocialLinks, getUserProfile}  
from "../controllers/user.controller.js";

const router = express.Router();
router.use(verifyUser); // Apply verifyUser middleware to all routes in this router

//patch
router.route("/upload-avatar").patch( upload.single("avatar") , uploadAvatar ); //ok
router.route("/update-fullName").patch( updateFullName ) //ok
router.route("/update-email").patch( updateEmail ) //ok
router.route("/update-password").patch( updatePassword ) //ok
router.route("/update-bio").patch( updateBio ) //ok
router.route("/update-socials").patch( updateSocialLinks ) //ok

//get
router.route("profile/:username").get( getUserProfile );
router.route("/follow/:username").get( getFollowingFollowers); 


export default router;