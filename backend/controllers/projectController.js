import Project from "../models/Project.js";


export const createProject = async (req, res) => {

    try {

        const { title, description, dueDate } = req.body;

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

            owner: req.user.id,

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

// export const getProjects = async (req, res) => {

//     try {

//         const projects = await Project.find({

//             owner: req.user.id,

//         }).sort({

//             createdAt: -1,

//         });

//         res.status(200).json({

//             success: true,

//             count: projects.length,

//             projects,

//         });

//     }

//     catch (error) {

//         res.status(500).json({

//             success: false,

//             message: error.message,

//         });

//     }

// };

export const getProjects = async (req, res) => {

    try {

        console.log("Logged User =>", req.user);

        const projects = await Project.find({
            owner: req.user.id,
        }).sort({
            createdAt: -1,
        });

        console.log("Projects =>", projects);

        res.status(200).json({
            success: true,
            count: projects.length,
            projects,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateProject = async (req, res) => {

    try {

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.dueDate = req.body.dueDate || project.dueDate;
        project.status = req.body.status || project.status;

        await project.save();

        res.status(200).json({
            success: true,
            message: "Project Updated Successfully",
            project,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const deleteProject = async (req, res) => {

    try {

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id,
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

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};