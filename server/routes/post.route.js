import Router from "express"
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware";
import { createPost } from "../controllers/post.controller";
const router = Router();

router.use(verifyUser);
router.route("/create-post").post(upload.array("posts", 5), createPost);//working

export default router;