import {Router} from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { getUserAnalytics , getPostAnalytics ,getTopPosts } from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyUser);

router.route("/user"). get(getUserAnalytics);
router.route("/post/:id"). get(getPostAnalytics);
router.route("/topPosts").get(getTopPosts);

export default router;