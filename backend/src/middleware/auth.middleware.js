import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import redisClient from "../config/redis.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  try {
    let token;

    // Extract token from cookies or Authorization header
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorized to access this route" });
    }

    // Check if token is blacklisted in Redis (from your logout functionality)
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted === "blacklisted") {
      return res.status(401).json({
        error: "Token has expired or was logged out. Please login again.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user and attach to request object
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "The user belonging to this token no longer exists." });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
