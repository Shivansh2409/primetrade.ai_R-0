import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, text } = req.body;
    const note = new Note({ userId: req.user._id, title, text });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Note creation failed" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetching notes failed" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetching note failed" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Note update failed" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Note deletion failed" });
  }
};
