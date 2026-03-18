import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadAvatar , changePassword } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post( "/upload-avatar" , upload.single("avatar") , uploadAvatar );
router.post("/change-password", verifyUser, changePassword )
export default router;