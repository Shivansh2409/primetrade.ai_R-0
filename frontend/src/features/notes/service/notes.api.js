import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // JWT cookies
});

export async function createNote(title, content) {
  try {
    const response = await api.post("/notes/create", {
      title: title,
      text: content,
    });
    return response.data;
  } catch (err) {
    console.error("Create note error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function getNotes() {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (err) {
    console.error("Get notes error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function getNote(id) {
  try {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  } catch (err) {
    console.error("Get note error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function updateNote(noteId, text) {
  const id = noteId;
  try {
    const response = await api.put(`/notes/${id}`, { text });
    return response.data;
  } catch (err) {
    console.error("Update note error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function deleteNote(id) {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (err) {
    console.error("Delete note error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}
