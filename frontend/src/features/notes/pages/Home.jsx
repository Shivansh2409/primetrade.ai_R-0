import React, { useState, useEffect } from "react";
import { useAuth } from "../../user/hooks/useAuth";
import { useNotes } from "../hooks/useNotes";
import "../notes.scss"; // Shared dark theme

const Home = () => {
  const { user } = useAuth();
  const { notes, loading, error, addNote, editNote, removeNote, fetchNotes } =
    useNotes();
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [title, setTitle] = useState("");
  const [noteId, setNoteId] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    try {
      await addNote(newNoteContent, title);
      setNewNoteContent("");
    } catch (err) {
      console.error("Add note failed", err);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditContent(note.text);
    setNoteId(note._id);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!editContent) return;
    try {
      await editNote(noteId, editContent);
      setEditingNote(null);
      setEditContent("");
      fetchNotes();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await removeNote(id);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading && notes.length === 0) {
    return (
      <div className="loading-container">
        <div className="loader">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="notes-home">
      <div className="notes-header">
        <div className="user-info">
          <h1>Welcome, {user?.name || user?.email}</h1>
          <p>
            {notes.length} note{notes.length !== 1 ? "s" : ""}
          </p>
        </div>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="notes-container">
        <form onSubmit={handleAddNote} className="add-note-form">
          <div className="input-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a new note Title..."
              className="note-input"
            />
          </div>
          <div className="input-group">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write a new note..."
              className="note-input"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={!newNoteContent.trim()}
          >
            Add Note
          </button>
        </form>

        {editingNote && (
          <form onSubmit={handleUpdateNote} className="edit-note-form">
            <div className="input-group">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="note-input"
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={!editContent}
              >
                Update
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEditingNote(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Add one above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="note-card">
                <p className="note-content">{note.title}</p>
                <p className="note-content">{note.text}</p>
                <div className="note-actions">
                  <button
                    onClick={() => handleEdit(note)}
                    className="btn-edit"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="btn-delete"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
