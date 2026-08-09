import Team from "../models/Team.js";


// Add Team Member
export const addTeamMember = async (req, res) => {

    try {

        const {
            name,
            email,
            role,
        } = req.body;


        if (!name || !email) {

            return res.status(400).json({

                success: false,

                message: "Name and Email are required",

            });

        }


        // Check duplicate member

        const existingMember = await Team.findOne({

            email: email.toLowerCase(),

            owner: req.user._id,

        });


        if (existingMember) {

            return res.status(400).json({

                success: false,

                message: "Team member already exists",

            });

        }


        const member = await Team.create({

            name,

            email: email.toLowerCase(),

            role: role || "Member",

            owner: req.user._id,

        });


        res.status(201).json({

            success: true,

            message: "Team member added successfully",

            member,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Get Team Members
export const getTeamMembers = async (req, res) => {

    try {

        const members = await Team.find({

            owner: req.user._id,

        }).sort({

            createdAt: -1,

        });


        res.status(200).json({

            success: true,

            count: members.length,

            members,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Update Team Member
export const updateTeamMember = async (req, res) => {

    try {

        const member = await Team.findOne({

            _id: req.params.id,

            owner: req.user._id,

        });


        if (!member) {

            return res.status(404).json({

                success: false,

                message: "Team member not found",

            });

        }


        const updatedMember = await Team.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );


        res.status(200).json({

            success: true,

            message: "Team member updated successfully",

            member: updatedMember,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Delete Team Member
export const deleteTeamMember = async (req, res) => {

    try {

        const member = await Team.findOne({

            _id: req.params.id,

            owner: req.user._id,

        });


        if (!member) {

            return res.status(404).json({

                success: false,

                message: "Team member not found",

            });

        }


        await member.deleteOne();


        res.status(200).json({

            success: true,

            message: "Team member deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};