import express from "express";
import upload from "../middlewares/upload.middleware.js";
import * as UserController from "../controllers/user.controller.js";

const router = express.Router();
router.post(
  "/upload-avatar",
  upload.single("avatar"),  
  UserController.uploadAvatar  
);

export default router;