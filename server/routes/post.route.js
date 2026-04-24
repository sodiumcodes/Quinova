import Router from "express"
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware";
import { createPost, viewPostById, editPost, deletePost } from "../controllers/post.controller";
const router = Router();

router.use(verifyUser);
//post 
router.route("/create-post").post(upload.array("posts", 5), createPost);//working

//get
router.route("/view-post/:id").get(viewPostById);
export default router;