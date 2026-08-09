import express from "express";

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Create + Get All Tasks

router
    .route("/")
    .get(protect, getTasks)
    .post(protect, createTask);


// Get Single Task

router.get(
    "/:id",
    protect,
    getTaskById
);


// Update Task

router.put(
    "/:id",
    protect,
    updateTask
);


// Delete Task

router.delete(
    "/:id",
    protect,
    deleteTask
);
export default router;