import express from "express";
const router = express.Router();

// controller
import { register, login, getCurrentUser } from "../controllers/userController.js";

// Middlewares
import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { strictLimiter } from "../middlewares/rateLimiter.js";


// Routes
router.post("/register", strictLimiter, register);
router.post("/login", strictLimiter, login);
router.get("/me", authentication, authorize("user", "admin"), getCurrentUser);

export default router;
