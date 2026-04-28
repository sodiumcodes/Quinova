import {Router} from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { getUserAnalytics , getPostAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyUser);

router.route("/user"). get(getUserAnalytics);
router.route("/post/:id"). get(getPostAnalytics);

export default router;