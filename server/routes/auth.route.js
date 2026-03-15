import {Router} from "express";
import {login, logout, register}from '../controllers/auth.controller.js'
import { verifyUser } from "../middlewares/auth.middleware.js";
const authRouter = Router();

// authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/register', register);
authRouter.post('/logout', verifyUser, logout);

export default authRouter;