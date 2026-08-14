import Project from "../models/Project.js";
import User from "../models/User.js";


// Create Project
export const createProject = async (req, res) => {

    try {

        const {
            title,
            description,
            dueDate,
        } = req.body;


        if (!title) {

            return res.status(400).json({

                success: false,

                message: "Project title is required",

            });

        }


        const project = await Project.create({

            title,

            description,

            dueDate,

            owner: req.user._id,

        });


        res.status(201).json({

            success: true,

            message: "Project created successfully",

            project,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Get Projects
// Owner + Project Members
export const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({

            $or: [

                {
                    owner: req.user._id,
                },

                {
                    members: req.user._id,
                },

            ],

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

            });


        res.status(200).json({

            success: true,

            count: projects.length,

            projects,

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


// Add Member to Project
export const addProjectMember = async (req, res) => {

    try {

        const { email } = req.body;

        const projectId = req.params.id;


        if (!email) {

            return res.status(400).json({

                success: false,

                message: "Member email is required",

            });

        }


        // Only project owner can add members

        const project = await Project.findOne({

            _id: projectId,

            owner: req.user._id,

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found or unauthorized",

            });

        }


        // Find registered user

        const user = await User.findOne({

            email: email.toLowerCase().trim(),

        });


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "No registered user found with this email",

            });

        }


        // Owner cannot be added as member

        if (
            user._id.toString() ===
            req.user._id.toString()
        ) {

            return res.status(400).json({

                success: false,

                message: "Project owner is already a member",

            });

        }


        // Check duplicate member

        const alreadyMember =
            project.members.some(

                (memberId) =>
                    memberId.toString() ===
                    user._id.toString()

            );


        if (alreadyMember) {

            return res.status(400).json({

                success: false,

                message: "User is already a project member",

            });

        }


        // Add member

        project.members.push(user._id);

        await project.save();


        // Populate updated project

        const updatedProject =
            await Project.findById(project._id)

                .populate(
                    "owner",
                    "name email avatar"
                )

                .populate(
                    "members",
                    "name email avatar"
                );


        res.status(200).json({

            success: true,

            message: "Member added to project successfully",

            project: updatedProject,

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

// Remove Member from Project
// Owner Only
export const removeProjectMember = async (req, res) => {

    try {

        const projectId = req.params.id;
        const memberId = req.params.memberId;

        // Only project owner can remove members
        const project = await Project.findOne({
            _id: projectId,
            owner: req.user._id,
        });

        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project not found or unauthorized",
            });

        }

        // Check whether user is actually a member
        const isMember = project.members.some(
            (id) =>
                id.toString() ===
                memberId.toString()
        );

        if (!isMember) {

            return res.status(404).json({
                success: false,
                message: "User is not a project member",
            });

        }

        // Remove member
        project.members =
            project.members.filter(
                (id) =>
                    id.toString() !==
                    memberId.toString()
            );

        await project.save();

        // Return updated project
        const updatedProject =
            await Project.findById(project._id)
                .populate(
                    "owner",
                    "name email avatar"
                )
                .populate(
                    "members",
                    "name email avatar"
                );

        res.status(200).json({

            success: true,

            message:
                "Member removed from project successfully",

            project: updatedProject,

        });

    } catch (error) {

        console.log(
            "Remove member error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Update Project
// Owner Only
export const updateProject = async (req, res) => {

    try {

        const project = await Project.findOne({

            _id: req.params.id,

            owner: req.user._id,

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found",

            });

        }


        project.title =
            req.body.title || project.title;

        project.description =
            req.body.description ||
            project.description;

        project.dueDate =
            req.body.dueDate ||
            project.dueDate;

        project.status =
            req.body.status ||
            project.status;


        await project.save();


        res.status(200).json({

            success: true,

            message: "Project Updated Successfully",

            project,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// Delete Project
// Owner Only
export const deleteProject = async (req, res) => {

    try {

        const project = await Project.findOne({

            _id: req.params.id,

            owner: req.user._id,

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found",

            });

        }


        await project.deleteOne();


        res.status(200).json({

            success: true,

            message: "Project Deleted Successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Get Single Project
// Owner + Project Members
export const getProjectById = async (req, res) => {

    try {

        const project = await Project.findOne({

            _id: req.params.id,

            $or: [

                {
                    owner: req.user._id,
                },

                {
                    members: req.user._id,
                },

            ],

        })

            .populate(
                "owner",
                "name email avatar"
            )

            .populate(
                "members",
                "name email avatar"
            );


        if (!project) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found or you do not have access",

            });

        }


        res.status(200).json({

            success: true,

            project,

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