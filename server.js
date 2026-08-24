import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";


const startServer = async () => {
  try {
    

    app.listen(3000, () => {
      console.log("server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();