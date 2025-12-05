import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRoutes from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ----- MIDDLEWARE -----
app.use(logger);
app.use(cors());
app.use(express.json());

// ----- ROUTES -----
app.use("/notes", notesRoutes);

// ----- 404 -----
app.use(notFoundHandler);

// ----- GLOBAL ERROR HANDLER -----
app.use(errorHandler);

// ----- START SERVER -----
const startServer = async () => {
  await connectMongoDB();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
};

startServer();
