import Router from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { getPostByTag } from "../controllers/discovery.controller.js";
const router = Router();

router.use(verifyUser);

router.route("/posts").get(getPostByTag);

export default router;