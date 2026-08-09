import express from "express";

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addProjectMember,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Projects
router
    .route("/")
    .get(protect, getProjects)
    .post(protect, createProject);

// Get Single Project
router.get(
    "/:id",
    protect,
    getProjectById
);

// Add Member to Project
router.post(
    "/:id/members",
    protect,
    addProjectMember
);

// Update Project
router.put(
    "/:id",
    protect,
    updateProject
);

// Delete Project
router.delete(
    "/:id",
    protect,
    deleteProject
);


export default router;