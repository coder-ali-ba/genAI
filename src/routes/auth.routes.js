import express from "express";
import { getMeController, loginUserController, logoutController, registerController } from "../controllers/auth.controllers.js";
import authMiddelware from "../middlewares/authMiddleware.js";
const authRouter = express.Router();

authRouter.post("/register" , registerController);
authRouter.post("/login" , loginUserController);
authRouter.get("/logout" , logoutController);
authRouter.get("/get-me" , authMiddelware , getMeController)

export default authRouter;