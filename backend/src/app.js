import express from "express";
import authRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import NoteRoute from "./routes/notes.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/notes", NoteRoute);

export default app;
