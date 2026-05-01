import Router from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createCollection , getCollections , deleteCollection, updateCollectionName , saveToDefault , addToCollection , removeFromCollection , updateNote , getCollectionItems } from "../controllers/collection.controller.js";

const router = Router();

router.use(verifyUser)

//collection routes
router.route("/create/:name").post(createCollection);

router.route("/all").get(getCollections);

router.route("/delete/:name").delete(deleteCollection);

router.route("/update-name/:name").patch(updateCollectionName);
export default router;