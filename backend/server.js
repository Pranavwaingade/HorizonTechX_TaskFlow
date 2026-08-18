import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/team", teamRoutes);

app.get("/api/test", protect, (req, res) => {

    res.json({

        success: true,
        message: "Protected Route Working",

        user: req.user

    });

});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 TaskFlow Backend Running Successfully"
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});



