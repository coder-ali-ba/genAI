import mongoose from "mongoose";
import "dotenv/config"
const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI) ;
        console.log("connected");
              
    } catch (error) {
        console.log("connection Error" , error );       
    }
}
export default connectToDB