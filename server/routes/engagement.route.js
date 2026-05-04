import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { toggleLike, toggleSave , addPostView } from "../controllers/engagement.controller.js"
import {createComment, removeComment, editComment, toggleLikeComment, replyComment, allComments, getReplies} from "../controllers/comment.controller.js"
const router = Router();

router.use(verifyUser);

//posts
router.route( "/posts/like/:id" ).post( toggleLike);
router.route( "/posts/save/:id" ).post( toggleSave);
router.route( "/posts/view/:id" ).post( addPostView);

//comments
router.route("/posts/comment/:id").post(createComment);
router.route("/posts/like-comment/:id").post(toggleLikeComment);
router.route("/posts/reply-to-comment/:id/:parentId").post(replyComment);

router.route("/posts/get-comments/:id").get(allComments);
router.route("/posts/get-comment-replies/:id").get(getReplies);

router.route("/posts/edit-comment/:id").patch(editComment);

router.route("/posts/remove-comment/:id").delete(removeComment);

export default router;