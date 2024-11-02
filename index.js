import express from 'express'
import cors from 'cors'
import connectDB from './config/dbConnection.js'
import routes from "./routes/index.js";

import env from "dotenv";
env.config();
//app config
const PORT = process.env.POST || 5500
const app = express();
// db config
connectDB();

// middleware
app.use(express.json());
app.use(
    cors({
      origin: [
        "https://cleanslate.netlify.app",
        "http://localhost:5173",
        "http://localhost:3000",
      ],
      credentials: true,
    })
  );

app.get("/", (req,res)=>res.send("Running API"))
//  calling routes from routes folder index js
app.use("/api", routes);

app.listen(PORT,()=>{
    console.log("Server Listening on Port ",PORT);
})

