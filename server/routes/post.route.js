import Router from "express"
import { verifyUser } from "../middlewares/auth.middleware";
import { createPost } from "../controllers/post.controller";
const router = Router();

router.use(verifyUser);
router.route("/create-post").post(upload.array("posts", 5), createPost);

export default router;