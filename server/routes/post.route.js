import Router from "express"
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createPost, viewPostById, viewAllPosts, editPost, deletePost } from "../controllers/post.controller.js";
const router = Router();

router.use(verifyUser);
//post 
router.route("/create").post(upload.array("posts", 5), createPost);//working

//get
router.route("/single/:id").get(viewPostById);
router.route("/all/:username").get(viewAllPosts);

//patch
router.route("/edit").patch(editPost)

//delete
router.route("/delete/:id").delete(deletePost);

export default router;