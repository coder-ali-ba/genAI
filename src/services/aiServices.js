import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLEGENAI_API_KEY
})

const invokeGeminiAI = async() => {
    const response = await ai.models.generateContent({
        model :"gemini-2.5-flash",
        contents :"Hello Gemini !  What is Interview"
    })
    console.log(response.text)
}

export default invokeGeminiAI