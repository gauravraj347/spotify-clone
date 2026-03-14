import express from "express"
import dotenv from "dotenv"
import { sql } from "./config/db.js";
import adminRoutes from "./route.js"
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "redis";
import cors from "cors"

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

cloudinary.config({
  cloud_name: process.env.Cloud_Name!,
  api_key: process.env.Cloud_Api_Key!,
  api_secret: process.env.Cloud_Api_Secret!,
});
const app = express();
app.use(express.json())

app.use(cors());

const PORT = process.env.PORT || 7000

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS albums(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          thumbnail VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS songs(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          thumbnail VARCHAR(255),
          audio VARCHAR(255) NOT NULL,
          album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDb", error);
  }
}

app.use("/api/v1", adminRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
