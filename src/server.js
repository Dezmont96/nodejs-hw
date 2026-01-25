import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRoutes from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// routes
app.use(notesRoutes);

// 404
app.use(notFoundHandler);

// errors
app.use(errorHandler);

const startServer = async () => {
  await connectMongoDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
