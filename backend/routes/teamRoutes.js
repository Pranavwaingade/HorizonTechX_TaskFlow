import express from "express";

import {
    addTeamMember,
    getTeamMembers,
    updateTeamMember,
    deleteTeamMember,
} from "../controllers/teamController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Team Members

router
    .route("/")
    .get(protect, getTeamMembers)
    .post(protect, addTeamMember);


// Individual Team Member
router
    .route("/:id")
    .put(protect, updateTeamMember)
    .delete(protect, deleteTeamMember);


export default router;