import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {uploadAvatar} from "../controllers/user.controller.js";

const router = express.Router();
router.post(
  "/upload-avatar",
  upload.single("avatar"),  
  uploadAvatar  
);

export default router;