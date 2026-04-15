import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(PORT);
});
