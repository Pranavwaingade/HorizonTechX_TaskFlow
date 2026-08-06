import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {

    try {

        const userId = req.user._id;

        // Stats

        const totalProjects = await Project.countDocuments({
            owner: userId,
        });

        const totalTasks = await Task.countDocuments({
            owner: userId,
        });

        const completedTasks = await Task.countDocuments({
            owner: userId,
            status: "Completed",
        });

        const pendingTasks = await Task.countDocuments({
            owner: userId,
            status: "Pending",
        });

        const highPriorityTasks = await Task.countDocuments({
            owner: userId,
            priority: "High",
        });

        // Recent Projects

        const recentProjects = await Project.find({
            owner: userId,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Tasks

        const todayTasks = await Task.find({
            owner: userId,
        })
            .populate("project", "title")
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Activity

        const recentActivity = await Task.find({
            owner: userId,
        })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select("title status updatedAt");

        res.status(200).json({

            success: true,

            stats: {

                totalProjects,

                totalTasks,

                completedTasks,

                pendingTasks,

                highPriorityTasks,

            },

            recentProjects,

            todayTasks,

            recentActivity,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};