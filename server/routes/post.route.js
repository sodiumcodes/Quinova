import Router from "express"
import upload from "../middlewares/upload.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createPost, viewPostById, viewAllPosts, editImages, editCaption, editTag, deletePost , toggleFeature } from "../controllers/post.controller.js";
const router = Router();

router.use(verifyUser);
//post 
router.route("/create").post(upload.array("posts", 5), createPost); 
router.route("/feature/:id").post(toggleFeature);

//get
router.route("/single/:id").get(viewPostById);
router.route("/all/:username").get(viewAllPosts);

//patch
router.route("/edit-image/:id").patch(editImages) 
router.route("/edit-caption/:id").patch(editCaption)
router.route("/edit-tag/:id").patch(editTag)

//delete
router.route("/delete/:id").delete(deletePost);

export default router;