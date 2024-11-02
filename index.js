import express from 'express'
import env from 'dotenv'
import cors from 'cors'

env.config();

const app = express();
const PORT = process.env.POST || 5500
app.use(express.json());
app.use(cors())

app.get("/", (req,res)=>{
res.send("Running API");
})

app.listen(PORT,()=>{
    console.log("Server Listening on Port ",PORT);
})

