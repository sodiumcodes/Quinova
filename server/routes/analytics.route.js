import {Router} from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { getUserAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyUser);

router.route("/user"). get(getUserAnalytics);

export default router;