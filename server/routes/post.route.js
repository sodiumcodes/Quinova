import Router from "express"
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createPost, viewPostById, viewAllPosts, editPost, deletePost } from "../controllers/post.controller.js";
const router = Router();

router.use(verifyUser);
//post 
router.route("/create-post").post(upload.array("posts", 5), createPost);//working

//get
router.route("/single-post/:id").get(viewPostById);
router.route("/all-posts/:username").get(viewAllPosts);
export default router;