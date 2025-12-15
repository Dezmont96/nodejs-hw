import { Router } from 'express';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/notes', authenticate, getAllNotesSchema, getAllNotes);
router.get('/notes/:noteId', authenticate, noteIdSchema, getNoteById);
router.post('/notes', authenticate, createNoteSchema, createNote);
router.patch('/notes/:noteId', authenticate, updateNoteSchema, updateNote);
router.delete('/notes/:noteId', authenticate, noteIdSchema, deleteNote);

export default router;
