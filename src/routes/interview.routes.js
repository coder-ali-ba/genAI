import express from "express";
import authMiddelware from "../middlewares/authMiddleware.js";
import generateInterviewReportController from "../controllers/interview.controllers.js";
import upload from "../middlewares/fileMiddleware.js";

const interviewRouter = express.Router()

interviewRouter.post("/generate" , authMiddelware ,upload.single("resume") , generateInterviewReportController)

export default interviewRouter