import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { generalLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.use(authentication);
router.use(authorize("user", "admin"));
router.use(generalLimiter);

router.get("/", getNotes); // Read
router.post("/", createNote); // Create
router.put("/:id", updateNote); // Update
router.delete("/:id", deleteNote); // Delete

export default router;
