import Router from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createCollection , getCollections , deleteCollection, updateCollectionName , saveItemToCollection , removeItemFromCollection , updateItemNote , getCollectionItems } from "../controllers/collection.controller.js";

const router = Router();

router.use(verifyUser)

//collection routes
router.route("/create/:name").post(createCollection);

router.route("/all").get(getCollections);

router.route("/delete/:name").delete(deleteCollection);

router.route("/update-name/:id").patch(updateCollectionName);

//collectionItems routes

router.route("/item/save").post(saveItemToCollection);
router.route("/item/all/:name").get(getCollectionItems);
router.route("/item/update-note/:id").patch(updateItemNote);
router.route("/item/remove/:id").delete(removeItemFromCollection);
export default router;