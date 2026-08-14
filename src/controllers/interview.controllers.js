

import pdfParse from "pdf-parse-new" 
import generateInterviewReport from "../services/aiServices.js"
import interviewReportModel from "../models/interviewReportModel.js"

const generateInterviewReportController = async (req, res) => {
  //  const pdfContent =await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
  const pdfContent = await pdfParse(req.file.buffer)
  const { selfDescription, jobDescription } = req.body

  const interviewReportByAi = await generateInterviewReport({
    resume: pdfContent.text,
    selfDescription,
    jobDescription
  })

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: pdfContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi
  })

  res.status(201).json({
    message: "Interview Report Generated Successfully",
    interviewReport: interviewReportByAi
  })
}


const getIntreviewReportByIDController = async(req , res) => {
  const {interviewId } = req.params
  const interviewReport = await interviewReportModel.findOne({_id : interviewId , user: req.user.id})
  if(!interviewReport){
    return res.status(404).json({
      message: "Interview Report not Found"
    })
  }
  res.status(200).json({
    data: interviewReport,
    message: "Interview Report Found Successfully"
  })
}


const getAllInterviewReportController =  async(req , res) => {
  const interviweReports = await  interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -seflDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps preparationPlan");

  res.status(200).json({
    data: interviweReports,
    message:'Got All Interview Reports'
  })
}
export { 
  generateInterviewReportController, 
  getIntreviewReportByIDController,
  getAllInterviewReportController
}
