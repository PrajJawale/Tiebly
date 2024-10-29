import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'https://tiebly.onrender.com',  // Frontend origin
    // origin:'http://localhost/8000',
    credentials: true,                // Enable credentials like cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use('/api/user', userRoute);
app.use('/api/company', companyRoute);
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute);
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})

app.listen(PORT, () => {
    connectDB();
    console.log(`App running successfully on port ${PORT}`);
});