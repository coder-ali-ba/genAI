
import express, { urlencoded } from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import interviewRouter from "./routes/interview.routes.js";

const app =express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth" , authRouter)
app.use("/api/interview" , interviewRouter)
app.use("/" , (req , res)=>{
    res.send("Server Is UPPPPP>>>>>>>")
})
export default app