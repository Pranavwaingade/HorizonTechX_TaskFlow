import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";


// Helper
// Check if user can access task/project
const canAccessTask = async (taskId, userId) => {

    const task = await Task.findById(taskId);

    if (!task) {
        return null;
    }

    const project = await Project.findOne({

        _id: task.project,

        $or: [

            {
                owner: userId,
            },

            {
                members: userId,
            },

        ],

    });

    if (!project) {
        return null;
    }

    return {
        task,
        project,
    };

};


// Create Comment
// Owner + Project Members
export const createComment = async (req, res) => {

    try {

        const { text } = req.body;

        const { taskId } = req.params;


        if (!text || !text.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Comment text is required",

            });

        }


        // Check Task + Project access

        const access =
            await canAccessTask(

                taskId,

                req.user._id

            );


        if (!access) {

            return res.status(403).json({

                success: false,

                message:
                    "You do not have access to this task",

            });

        }


        const comment =
            await Comment.create({

                text: text.trim(),

                task: taskId,

                user: req.user._id,

            });


        const populatedComment =
            await Comment.findById(

                comment._id

            )

                .populate(

                    "user",

                    "name email avatar"

                )

                .populate(

                    "task",

                    "title"

                );


        res.status(201).json({

            success: true,

            message:
                "Comment added successfully",

            comment: populatedComment,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Get Comments For Specific Task
// Owner + Project Members
export const getComments = async (req, res) => {

    try {

        const { taskId } = req.params;


        // Check Task + Project access

        const access =
            await canAccessTask(

                taskId,

                req.user._id

            );


        if (!access) {

            return res.status(403).json({

                success: false,

                message:
                    "You do not have access to this task",

            });

        }


        const comments =
            await Comment.find({

                task: taskId,

            })

                .populate(

                    "user",

                    "name email avatar"

                )

                .populate(

                    "task",

                    "title"

                )

                .sort({

                    createdAt: -1,

                });


        res.status(200).json({

            success: true,

            comments,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Get ALL Comments
// Owner + Project Members
export const getAllComments = async (req, res) => {

    try {

        // Find projects accessible
        // by logged-in user

        const projects =
            await Project.find({

                $or: [

                    {
                        owner:
                            req.user._id,
                    },

                    {
                        members:
                            req.user._id,
                    },

                ],

            }).select("_id");


        const projectIds =
            projects.map(

                (project) =>
                    project._id

            );


        // Find tasks inside
        // accessible projects

        const tasks =
            await Task.find({

                project: {

                    $in: projectIds,

                },

            }).select("_id");


        const taskIds =
            tasks.map(

                (task) =>
                    task._id

            );


        // Find comments
        // belonging to those tasks

        const comments =
            await Comment.find({

                task: {

                    $in: taskIds,

                },

            })

                .populate(

                    "user",

                    "name email avatar"

                )

                .populate(

                    "task",

                    "title"

                )

                .sort({

                    createdAt: -1,

                });


        res.status(200).json({

            success: true,

            count: comments.length,

            comments,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Update Comment
// Comment Owner Only
export const updateComment = async (req, res) => {

    try {

        const { commentId } =
            req.params;

        const { text } =
            req.body;


        if (!text || !text.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Comment text is required",

            });

        }


        // Find user's own comment

        const comment =
            await Comment.findOne({

                _id: commentId,

                user: req.user._id,

            });


        if (!comment) {

            return res.status(404).json({

                success: false,

                message:
                    "Comment not found or unauthorized",

            });

        }


        // Also make sure task/project
        // is still accessible

        const access =
            await canAccessTask(

                comment.task,

                req.user._id

            );


        if (!access) {

            return res.status(403).json({

                success: false,

                message:
                    "You do not have access to this task",

            });

        }


        comment.text =
            text.trim();


        await comment.save();


        const updatedComment =
            await Comment.findById(

                comment._id

            )

                .populate(

                    "user",

                    "name email avatar"

                )

                .populate(

                    "task",

                    "title"

                );


        res.status(200).json({

            success: true,

            message:
                "Comment updated successfully",

            comment:
                updatedComment,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Delete Comment
// Comment Owner Only
export const deleteComment = async (req, res) => {

    try {

        const { commentId } =
            req.params;


        const comment =
            await Comment.findOne({

                _id: commentId,

                user: req.user._id,

            });


        if (!comment) {

            return res.status(404).json({

                success: false,

                message:
                    "Comment not found or unauthorized",

            });

        }


        // Check task/project access

        const access =
            await canAccessTask(

                comment.task,

                req.user._id

            );


        if (!access) {

            return res.status(403).json({

                success: false,

                message:
                    "You do not have access to this task",

            });

        }


        await comment.deleteOne();


        res.status(200).json({

            success: true,

            message:
                "Comment deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};