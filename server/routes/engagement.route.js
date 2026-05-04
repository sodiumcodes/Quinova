import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { toggleLike, toggleSave , addPostView } from "../controllers/engagement.controller.js"
import {createComment, removeComment, editComment, toggleLikeComment, replyComment, allComments, getReplies} from "../controllers/comment.controller.js"
const router = Router();

router.use(verifyUser);

//posts
router.route( "/posts/:id/like" ).post( toggleLike);
router.route( "/posts/:id/save" ).post( toggleSave);
router.route( "/posts/:id/view" ).post( addPostView);

//comments
router.route("/posts/:id/comment").post(createComment);
router.route("/posts/:id/like-comment").post(toggleLikeComment); //!
router.route("/posts/:id/reply-to-comment").post(replyComment);//!

router.route("/posts/:id/get-comments").get(allComments);
router.route("/posts/:id/get-comment-replies").get(getReplies);

router.route("/posts/:id/edit-comment").patch(editComment);

router.route("/posts/:id/remove-comment").delete(removeComment);

export default router;