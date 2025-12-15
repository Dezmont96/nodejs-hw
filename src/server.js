import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ----- MIDDLEWARE -----
app.use(logger);
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ----- ROUTES -----
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

// ----- 404 -----
app.use(notFoundHandler);

// ----- CELEBRATE VALIDATION ERRORS -----
app.use(errors());

// ----- GLOBAL ERROR HANDLER -----
app.use(errorHandler);

// ----- START SERVER -----
const startServer = async () => {
  await connectMongoDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
