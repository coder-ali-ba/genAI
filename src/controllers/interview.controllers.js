// import  pdfParse  from "pdf-parse"
// import generateInterviewReport from "../services/aiServices.js"
// import interviewReportModel from "../models/interviewReportModel.js"


// const generateInterviewReportController = async (req , res) => {
//  const resumeFile = req.file
//  const pdfContent =await new (pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText
//  const {selfDescription , jobDescription} = req.body

//  const interviewReportByAi = await generateInterviewReport({
//     resume : pdfContent.text,
//     selfDescription,
//     jobDescription
//  })
//  const interviewReport = await interviewReportModel.create({
//     user : req.user.id,
//     resume: pdfContent.text,
//     selfDescription,
//     jobDescription,
//     ...interviewReportByAi
//  })
//  res.status(201).json({
//     message: "Interview Report Generated Successfully",
//     interviewReport
//  })
// }
// export default generateInterviewReportController



// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");


// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParseModule = require("pdf-parse");
// const pdfParse = pdfParseModule.default || pdfParseModule; 


import pdfParse from "pdf-parse-new" 
import generateInterviewReport from "../services/aiServices.js"
import interviewReportModel from "../models/interviewReportModel.js"

const generateInterviewReportController = async (req, res) => {
//   const pdfContent =await new(pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText
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
    interviewReport
  })
}

export default generateInterviewReportController
