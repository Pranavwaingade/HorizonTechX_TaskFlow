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