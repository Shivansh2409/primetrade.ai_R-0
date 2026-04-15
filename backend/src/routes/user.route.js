import express from "express";
import {
  validateRegister,
  validateLogin,
} from "../validation/user.validator.js";
import { register, login, logout } from "../controllers/user.controller.js";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

// Routes

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.post("/logout", logout);

// Example of a general protected route (Logged in users only)
authRouter.get("/profile", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Example of an Admin-only protected route
authRouter.get(
  "/admin-dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard, admin!" });
  },
);

export default authRouter;
