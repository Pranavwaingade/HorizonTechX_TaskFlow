import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate,
            project,
        } = req.body;

        if (!title || !project) {

            return res.status(400).json({
                success: false,
                message: "Title and Project are required",
            });

        }

        const task = await Task.create({

            title,
            description,
            status,
            priority,
            dueDate,
            project,

            owner: req.user._id,

        });

        res.status(201).json({

            success: true,
            message: "Task Created Successfully",

            task,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Get Tasks
export const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            owner: req.user._id,

        })

            .populate("project", "title")

            .sort({

                createdAt: -1,

            });

        res.status(200).json({

            success: true,

            count: tasks.length,

            tasks,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const deleteTask = async (req, res) => {

    try {

        const task = await Task.findOne({

            _id: req.params.id,

            owner: req.user._id,

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found",

            });

        }

        await task.deleteOne();

        res.status(200).json({

            success: true,

            message: "Task Deleted Successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const updateTask = async (req, res) => {

    try {

        const task = await Task.findOne({

            _id: req.params.id,

            owner: req.user._id,

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found",

            });

        }

        const updatedTask = await Task.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );

        res.status(200).json({

            success: true,

            message: "Task Updated Successfully",

            task: updatedTask,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};