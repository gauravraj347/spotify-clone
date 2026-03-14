import express from "express"
import dotenv from "dotenv"
import songRoutes from "./route.js"
import { createClient } from "redis";
 
dotenv.config()

export const redisClient = createClient({
  password: process.env.Redis_Password ||"",
  socket: {
    host: "redis-11661.crce281.ap-south-1-3.ec2.cloud.redislabs.com",
    port: 11661,
  },
});

redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch(console.error);

const app = express();

app.use("/api/v1", songRoutes)

const PORT = process.env.PORT||8000

app.listen(PORT,()=>{
    console.log(`Song server running on ${PORT}`)

})