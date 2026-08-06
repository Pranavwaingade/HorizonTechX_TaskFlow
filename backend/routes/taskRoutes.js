import express from "express";

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Task & Get Tasks

router
    .route("/")
    .get(protect, getTasks)
    .post(protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;