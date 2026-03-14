import express from "express"
import dotenv from "dotenv"
import songRoutes from "./route.js"
 
dotenv.config()

const app = express();

app.use("/api/v1", songRoutes)

const PORT = process.env.PORT||8000

app.listen(PORT,()=>{
    console.log(`Song server running on ${PORT}`)

})