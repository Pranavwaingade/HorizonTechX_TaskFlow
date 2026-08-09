import express from "express";

import {
    createComment,
    getComments,
    updateComment,
    deleteComment,
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Task Comments

router
    .route("/task/:taskId")
    .get(protect, getComments)
    .post(protect, createComment);

// Individual Comment

router
    .route("/:commentId")
    .put(protect, updateComment)
    .delete(protect, deleteComment);

export default router;