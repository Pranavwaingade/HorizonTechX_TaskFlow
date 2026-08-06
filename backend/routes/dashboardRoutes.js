import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboardStats);

export default router;