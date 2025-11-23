// src/server.js
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
require('dotenv').config();

const app = express();

// ----- MIDDLEWARE -----
app.use(cors());
app.use(express.json());

const logger = pinoHttp();
app.use(logger);

// ----- ROUTES -----

// GET /notes
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// GET /notes/:noteId
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// GET /test-error
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// ----- 404 MIDDLEWARE -----
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// ----- ERROR HANDLER (500) -----
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  // Лог помилки через pino
  if (req.log) {
    req.log.error({ err }, 'Unhandled error');
  } else {
    // На випадок, якщо з якоїсь причини логера немає
    console.error(err);
  }

  res.status(500).json({
    message: err.message || 'Internal server error',
  });
});
/* eslint-enable no-unused-vars */

// ----- SERVER START -----
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Цей лог побачиш у консолі Render та локально
  console.log(`Server is running on port ${PORT}`);
});
