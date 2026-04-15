import express from "express";
import {
  validateRegister,
  validateLogin,
} from "../validation/user.validator.js";
import { register, login, logout } from "../controllers/user.controller.js";

// Routes

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.post("/logout", logout);

export default authRouter;
