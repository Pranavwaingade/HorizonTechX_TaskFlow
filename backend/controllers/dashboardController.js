import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {

    try {

        const userId = req.user._id;

        // Find projects accessible to user
        // Owner + Project Member
        const projects = await Project.find({

            $or: [

                {
                    owner: userId,
                },

                {
                    members: userId,
                },

            ],

        }).select("_id");

        const projectIds = projects.map(
            (project) => project._id
        );


        // Project Stats
        const totalProjects =
            projectIds.length;


        // Task Stats
        const totalTasks =
            await Task.countDocuments({

                project: {
                    $in: projectIds,
                },

            });


        const completedTasks =
            await Task.countDocuments({

                project: {
                    $in: projectIds,
                },

                status: "Completed",

            });


        const pendingTasks =
            await Task.countDocuments({

                project: {
                    $in: projectIds,
                },

                status: "Pending",

            });


        const highPriorityTasks =
            await Task.countDocuments({

                project: {
                    $in: projectIds,
                },

                priority: "High",

            });


        // Recent Projects
        const recentProjects =
            await Project.find({

                _id: {
                    $in: projectIds,
                },

            })

                .populate(
                    "owner",
                    "name email avatar"
                )

                .populate(
                    "members",
                    "name email avatar"
                )

                .sort({
                    createdAt: -1,
                })

                .limit(5);


        // Recent Tasks
        const todayTasks =
            await Task.find({

                project: {
                    $in: projectIds,
                },

            })

                .populate(
                    "project",
                    "title"
                )

                .sort({
                    createdAt: -1,
                })

                .limit(5);


        // Recent Activity
        const recentActivity =
            await Task.find({

                project: {
                    $in: projectIds,
                },

            })

                .sort({
                    updatedAt: -1,
                })

                .limit(5)

                .select(
                    "title status updatedAt project"
                )

                .populate(
                    "project",
                    "title"
                );


        // Response
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

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};