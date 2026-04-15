import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

import { protect } from "../middleware/auth.middleware.js";

// Routes

const NoteRoute = express.Router();

NoteRoute.post("/create", protect, createNote);
NoteRoute.get("/", protect, getNotes);
NoteRoute.get("/:id", protect, getNote);
NoteRoute.put("/:id", protect, updateNote);
NoteRoute.delete("/:id", protect, deleteNote);

export default NoteRoute;
