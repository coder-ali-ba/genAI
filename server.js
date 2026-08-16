import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(3000, () => {
      console.log("server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();