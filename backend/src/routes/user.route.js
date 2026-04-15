import express from "express";
import { validateRegister } from "../validation/user.validator.js";
import { register } from "../controllers/user.controller.js";

// Routes

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);

export default authRouter;
