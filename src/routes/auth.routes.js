import express from "express";
import { loginUserController, registerController } from "../controllers/auth.controllers.js";
const authRouter = express.Router()

authRouter.post("/register" , registerController)
authRouter.post("/login" , loginUserController)


export default authRouter