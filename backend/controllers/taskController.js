import Task from "../models/Task.js";
import Project from "../models/Project.js";


const canAccessProject = async (projectId, userId) => {

    const project = await Project.findOne({

        _id: projectId,

        $or: [

            { owner: userId },

            { members: userId },

        ],

    });

    return project;

};


// Create Task
// Owner + Project Members

export const createTask = async (req, res) => {

    try {

        const {

            title,
            description,
            status,
            priority,
            dueDate,
            project,
            assignedTo,

        } = req.body;


        if (!title || !project) {

            return res.status(400).json({

                success: false,

                message:
                    "Title and Project are required",

            });

        }


        // Check project access

        const projectData =
            await canAccessProject(

                project,

                req.user._id

            );


        if (!projectData) {

            return res.status(403).json({

                success: false,

                message:
                    "You do not have access to this project",

            });

        }


        // Validate Assigned User

        if (assignedTo) {

            const isProjectMember =
                projectData.members.some(

                    (memberId) =>
                        memberId.toString() ===
                        assignedTo.toString()

                );


            const isProjectOwner =
                projectData.owner.toString() ===
                assignedTo.toString();


            if (
                !isProjectMember &&
                !isProjectOwner
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Assigned user must be a project member",

                });

            }

        }


        const task = await Task.create({

            title,

            description,

            status,

            priority,

            dueDate,

            project,

            owner: req.user._id,

            assignedTo:
                assignedTo || null,

        });


        const populatedTask =
            await Task.findById(task._id)

                .populate(

                    "project",

                    "title owner members"

                )

                .populate(

                    "assignedTo",

                    "name email avatar"

                );


        res.status(201).json({

            success: true,

            message:
                "Task Created Successfully",

            task: populatedTask,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Get All Tasks
// Owner + Project Members

export const getTasks = async (req, res) => {

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


        const tasks =
            await Task.find({

                project: {

                    $in: projectIds,

                },

            })

                .populate(

                    "project",

                    "title"

                )

                .populate(

                    "assignedTo",

                    "name email avatar"

                )

                .sort({

                    createdAt: -1,

                });


        res.status(200).json({

            success: true,

            count: tasks.length,

            tasks,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Get Single Task
// Owner + Project Members

export const getTaskById = async (req, res) => {

    try {

        const task =
            await Task.findById(

                req.params.id

            );


        if (!task) {

            return res.status(404).json({

                success: false,

                message:
                    "Task not found",

            });

        }


        // Check project access

        const project =
            await canAccessProject(

                task.project,

                req.user._id

            );


        if (!project) {

            return res.status(403).json({

                success: false,

                message:
                    "You do not have access to this task",

            });

        }


        const populatedTask =
            await Task.findById(

                task._id

            )

                .populate(

                    "project",

                    "title"

                )

                .populate(

                    "assignedTo",

                    "name email avatar"

                );


        res.status(200).json({

            success: true,

            task: populatedTask,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Update Task
// Project Owner OR Task Creator

export const updateTask = async (req, res) => {

    try {

        const task =
            await Task.findById(

                req.params.id

            );


        if (!task) {

            return res.status(404).json({

                success: false,

                message:
                    "Task not found",

            });

        }


        // Check project access

        const project =
            await Project.findById(

                task.project

            );


        if (!project) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found",

            });

        }


        const isProjectOwner =
            project.owner.toString() ===
            req.user._id.toString();


        const isTaskCreator =
            task.owner.toString() ===
            req.user._id.toString();


        // Owner OR Task Creator can update

        if (
            !isProjectOwner &&
            !isTaskCreator
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to update this task",

            });

        }


        // Validate assignedTo

        if (
            req.body.assignedTo !== undefined &&
            req.body.assignedTo !== null &&
            req.body.assignedTo !== ""
        ) {

            const assignedUser =
                req.body.assignedTo;


            const isProjectMember =
                project.members.some(

                    (memberId) =>
                        memberId.toString() ===
                        assignedUser.toString()

                );


            const isProjectOwnerUser =
                project.owner.toString() ===
                assignedUser.toString();


            if (
                !isProjectMember &&
                !isProjectOwnerUser
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Assigned user must be a project member",

                });

            }

        }


        const updatedTask =
            await Task.findByIdAndUpdate(

                req.params.id,

                req.body,

                {

                    new: true,

                    runValidators: true,

                }

            )

                .populate(

                    "project",

                    "title owner members"

                )

                .populate(

                    "assignedTo",

                    "name email avatar"

                );


        res.status(200).json({

            success: true,

            message:
                "Task Updated Successfully",

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


// Delete Task
// Project Owner OR Task Creator

export const deleteTask = async (req, res) => {

    try {

        const task =
            await Task.findById(

                req.params.id

            );


        if (!task) {

            return res.status(404).json({

                success: false,

                message:
                    "Task not found",

            });

        }


        // Find project

        const project =
            await Project.findById(

                task.project

            );


        if (!project) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found",

            });

        }


        const isProjectOwner =
            project.owner.toString() ===
            req.user._id.toString();


        const isTaskCreator =
            task.owner.toString() ===
            req.user._id.toString();


        // Owner OR Task Creator can delete

        if (
            !isProjectOwner &&
            !isTaskCreator
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to delete this task",

            });

        }


        await task.deleteOne();


        res.status(200).json({

            success: true,

            message:
                "Task Deleted Successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};