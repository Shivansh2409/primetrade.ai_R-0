import axios from "axios";
// if docker baseURL:"/api/api"
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // JWT cookies
});

export async function register(email, userName, password, confirmPassword) {
  console.log(email, userName, password, confirmPassword);
  try {
    console.log("Registering user:", {
      email,
      userName,
      password,
      confirmPassword,
    });
    const response = await api.post("/auth/register", {
      email: email,
      password: password,
      name: userName,
      confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function login(email, password) {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function logout() {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (err) {
    console.error(
      "Fetching current user error:",
      err.response?.data || err.message,
    );
    throw err.response?.data || err.message;
  }
}
