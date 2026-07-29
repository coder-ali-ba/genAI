import express from "express";
import authMiddelware from "../middlewares/authMiddleware.js";
import {generateInterviewReportController,  getAllInterviewReportController, getIntreviewReportByIDController } from "../controllers/interview.controllers.js"
import upload from "../middlewares/fileMiddleware.js";

const interviewRouter = express.Router()

interviewRouter.post("/generate" , authMiddelware ,upload.single("resume") , generateInterviewReportController)
interviewRouter.get("/report/:interviewId" , authMiddelware , getIntreviewReportByIDController )
interviewRouter.get("/getAllInterviewTReport" , authMiddelware , getAllInterviewReportController)
export default interviewRouter