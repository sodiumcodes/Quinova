import Router from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createCollection , getCollections , deleteCollection , saveToDefault , addToCollection , removeFromCollection , updateNote , getCollectionItems } from "../controllers/collection.controller.js";
const router = Router();

router.use(verifyUser)
