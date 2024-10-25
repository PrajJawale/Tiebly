import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',  // Frontend origin
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

app.listen(PORT, () => {
    connectDB();
    console.log(`App running successfully on port ${PORT}`);
});
