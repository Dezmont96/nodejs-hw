import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// GET /notes (тільки свої, пагінація + фільтрація + пошук)
export const getAllNotes = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      tag,
      search,
    } = req.query;

    const skip = (page - 1) * perPage;

    // 🔥 базовий mongoose query з чейнінгом
    let query = Note.find()
      .where('userId')
      .equals(req.user._id);

    // 🔎 фільтрація по тегу
    if (tag) {
      query = query.where('tag').equals(tag);
    }

    // 🔍 повнотекстовий пошук
    if (search) {
      query = query.find({ $text: { $search: search } });
    }

    // 🔢 загальна кількість нотаток
    const totalNotes = await Note.countDocuments(query.getFilter());

    // 📄 нотатки з пагінацією
    const notes = await query
      .skip(skip)
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (err) {
    next(err);
  }
};

// GET /notes/:noteId (тільки свої)
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne()
      .where('_id')
      .equals(req.params.noteId)
      .where('userId')
      .equals(req.user._id);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

// POST /notes
export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// PATCH /notes/:noteId
export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.noteId,
        userId: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.noteId,
      userId: req.user._id,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};
