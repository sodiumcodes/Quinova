import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadAvatar , uploadCoverImage, updatePassword , updateEmail, updateFullName , getChanelProfile } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post( "/upload-avatar" ,verifyUser, upload.single("avatar") , uploadAvatar );
router.post("/upload-coverImage", verifyUser, upload.single("coverImage"), uploadCoverImage )
router.post("/update-fullName", verifyUser, updateFullName )
router.post("/update-email", verifyUser, updateEmail )
router.post("/update-password", verifyUser, updatePassword )
router.post("/channel-profile", getChanelProfile);

export default router;