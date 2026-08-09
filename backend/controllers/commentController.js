import Comment from "../models/Comment.js";
import Task from "../models/Task.js";

// Create Comment
export const createComment = async (req, res) => {

    try {

        const { text } = req.body;

        const { taskId } = req.params;

        if (!text || !text.trim()) {

            return res.status(400).json({

                success: false,

                message: "Comment text is required",

            });

        }

        // Check task exists and belongs to logged-in user

        const task = await Task.findOne({

            _id: taskId,

            owner: req.user._id,

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found",

            });

        }

        const comment = await Comment.create({

            text: text.trim(),

            task: taskId,

            user: req.user._id,

        });

        const populatedComment = await Comment.findById(

            comment._id

        ).populate(

            "user",

            "name email avatar"

        );

        res.status(201).json({

            success: true,

            message: "Comment added successfully",

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


// Get Comments
export const getComments = async (req, res) => {

    try {

        const { taskId } = req.params;

        // Check task belongs to logged-in user

        const task = await Task.findOne({

            _id: taskId,

            owner: req.user._id,

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found",

            });

        }

        const comments = await Comment.find({

            task: taskId,

        })

            .populate(

                "user",

                "name email avatar"

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

// Update Comment
export const updateComment = async (req, res) => {

    try {

        const { commentId } = req.params;

        const { text } = req.body;

        if (!text || !text.trim()) {

            return res.status(400).json({

                success: false,

                message: "Comment text is required",

            });

        }

        const comment = await Comment.findOne({

            _id: commentId,

            user: req.user._id,

        });

        if (!comment) {

            return res.status(404).json({

                success: false,

                message: "Comment not found or unauthorized",

            });

        }

        comment.text = text.trim();

        await comment.save();

        const updatedComment = await Comment.findById(

            comment._id

        ).populate(

            "user",

            "name email avatar"

        );

        res.status(200).json({

            success: true,

            message: "Comment updated successfully",

            comment: updatedComment,

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
export const deleteComment = async (req, res) => {

    try {

        const { commentId } = req.params;

        const comment = await Comment.findOne({

            _id: commentId,

            user: req.user._id,

        });

        if (!comment) {

            return res.status(404).json({

                success: false,

                message: "Comment not found or unauthorized",

            });

        }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({

            success: true,

            message: "Comment deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};