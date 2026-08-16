import  dotenv  from "dotenv";
dotenv.config()
// import configEnv from "./src/config/dotenv.js"
// configEnv()

import app from "./src/app.js"


import connectToDB from "./src/config/database.js"
connectToDB()


    app.listen(3000, () => {
        console.log("server running on http://localhost:3000");
    });


