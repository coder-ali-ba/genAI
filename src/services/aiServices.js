import { GoogleGenAI } from "@google/genai";
import {z} from "zod"
import {zodToJsonSchema } from "zod-to-json-schema"





const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLEGENAI_API_KEY
})

const interviewReportSchema =z.object({
    matchScore: z.number().describe("A number between 1 to 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The Technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question , what points to be covered , what approach to take etc.")
    })).describe("Technical question sthat can be asked in the interview along with their intention and how to answer them."),
    behaviouralQuestion: z.array(z.object({
        question: z.string().describe("The Technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question , what points to be covered , what approach to take etc.")
    })).describe("Behavioural question sthat can be asked in the interview along with their intention and how to answer them."),
    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low" , "Medium" , "High"]).describe("The Severity of this skill gap i,e how important these skills are")
    })).describe("List of skill gaps in the candidate's profile along with there severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan , starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures , system designs , mock interview "),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read specific book ")
    })).describe("A day-wise preparation plan for the candidate to follow  description in order to prepare for the interview effectively")
})

 const generateInterviewReport = async ({resume , selfDescription , jobDescription}) => {
    
   const prompt = `Generate Interview report for the for a candidate with following details:

   Resume: ${resume}
   Self Description: ${selfDescription}
   Job Description: ${jobDescription}` 

   const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(interviewReportSchema)
    }
   })

   return JSON.parse(response.text)

}


export default generateInterviewReport