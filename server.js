import configEnv from "./src/config/dotenv.js"
configEnv()

import app from "./src/app.js"

import connectToDB from "./src/config/database.js"
import invokeGeminiAI from "./src/services/aiServices.js"
invokeGeminiAI()

connectToDB().then(() => {
    app.listen(3000, () => {
        console.log("server running on http://localhost:3000");
    });
});

