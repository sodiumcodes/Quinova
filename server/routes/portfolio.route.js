import Router from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { getPortfolio } from "../controllers/portfolio.controller.js";

const router = Router();

router.route("/:username").get(verifyUser, getPortfolio );

export default router;
