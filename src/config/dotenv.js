import dotenv from "dotenv"

const configEnv = () => {
    dotenv.config();
    console.log("apikey",process.env.GOOGLEGENAI_API_KEY);
    
}
export default configEnv