import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRoutes from './router.js';
import cors from "cors"
dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send('User service is up and running!');
})

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to MongoDB');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.use(express.json());

app.use(cors());

app.use('/api/v1',userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`User service is running on port ${PORT}`);
    connectDB();
})