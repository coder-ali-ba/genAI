


import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe("Match score between candidate and job from 1 to 100"),

  title: z
    .string()
    .describe("The exact job title from the job description"),

  technicalQuestions: z
    .array(
      z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string(),
      })
    )
    .min(10),

  behavioralQuestion: z
    .array(
      z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string(),
      })
    )
    .min(5),

  skillGap: z
    .array(
      z.object({
        skill: z.string(),
        severity: z.enum(["Low", "Medium", "High"]),
      })
    )
    .min(1),

  preparationPlan: z
    .array(
      z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string()).min(2),
      })
    )
    .min(7),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLEGENAI_API_KEY,
  });

  const prompt = `
You are an expert technical recruiter and interview preparation specialist.

Your task is to analyze the candidate information and generate a COMPLETE interview report.

You MUST generate real content. NEVER return empty arrays.

========================
CANDIDATE RESUME
========================

${resume}

========================
CANDIDATE SELF DESCRIPTION
========================

${selfDescription}

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
REQUIRED OUTPUT
========================

1. MATCH SCORE
Calculate how well the candidate matches the job description.
Return a number between 1 and 100.

2. TITLE
Return the job title from the job description.

3. TECHNICAL QUESTIONS
Generate AT LEAST 10 technical interview questions.

Questions must be directly related to:
- technologies in the job description
- technologies in the candidate resume
- responsibilities of the position
- candidate's actual experience

For every question provide:
- question
- intention
- answer

4. BEHAVIORAL QUESTIONS
Generate AT LEAST 5 behavioral interview questions.

Questions should be relevant to:
- candidate's experience
- internship
- projects
- teamwork
- problem solving
- communication
- the target position

For every question provide:
- question
- intention
- answer

5. SKILL GAP
Compare the candidate's resume against the job description.

Identify skills that:
- are required by the job but missing from the resume
- are mentioned as nice-to-have but missing
- are weak compared to the job requirements

Generate AT LEAST 1 skill gap.

For every skill gap provide:
- skill
- severity: Low, Medium, or High

6. PREPARATION PLAN
Create a 7-DAY interview preparation plan.

Each day must contain:
- day
- focus
- at least 2 specific tasks

The preparation plan must be based on the candidate's actual skill gaps and the job description.

IMPORTANT RULES:

- DO NOT return empty arrays.
- DO NOT skip any section.
- DO NOT give generic information when specific information can be extracted from the resume and job description.
- Use the candidate's actual technologies and projects.
- Make the technical questions relevant to the Junior MERN Stack Developer position.
- Return ONLY JSON matching the provided schema.
`;

  console.log("========== SENDING TO GEMINI ==========");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log("========== GEMINI RAW RESPONSE ==========");
//   console.log(response.text);

  const result = JSON.parse(response.text);

  console.log("========== GEMINI PARSED RESPONSE ==========");
//   console.dir(result, { depth: null });

  return result;
};

export default generateInterviewReport;