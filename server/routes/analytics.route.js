import {Router} from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { getUserAnalytics , getPostAnalytics ,getTopPosts, getGrowthAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyUser);

router.route("/user"). get(getUserAnalytics);
router.route("/post/:id"). get(getPostAnalytics);
router.route("/topPosts").get(getTopPosts);
router.route("/growth").get(getGrowthAnalytics)
export default router;