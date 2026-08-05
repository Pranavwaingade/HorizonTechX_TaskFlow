import express from "express";

import {
    createProject,
    getProjects,
    updateProject,deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all projects & Create project

router
    .route("/")
    .get(protect, getProjects)
    .post(protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;