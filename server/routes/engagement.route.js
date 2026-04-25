import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { toggleLike, toggleSave , addPostView } from "../controllers/engagement.controller.js"
const router = Router();

router.use(verifyUser);

router.route( "/posts/:id/like" ).post( toggleLike);
router.route( "/posts/:id/save" ).post( toggleSave);
router.route( "/posts/:id/view" ).post( addPostView);

export default router;