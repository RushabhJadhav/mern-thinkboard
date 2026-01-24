import express from "express";
import { createNote, deleteNotes, getAllNotes, getNotesById, updateNotes } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNotesById);

router.post("/", createNote)

router.put("/:id", updateNotes)

router.delete("/:id", deleteNotes)

export default router;