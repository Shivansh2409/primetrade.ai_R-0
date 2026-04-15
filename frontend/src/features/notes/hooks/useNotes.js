import { useState, useEffect } from "react";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../service/notes.api.js";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data.notes || data); // Adapt based on backend response
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (content, title) => {
    setLoading(true);
    setError(null);
    try {
      const newNote = await createNote(title, content);
      setNotes([newNote, ...notes]);
      return newNote;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editNote = async (id, content) => {
    setLoading(true);
    setError(null);
    try {
      const updatedNote = await updateNote(id, content);
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
      return updatedNote;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    editNote,
    removeNote,
  };
};
