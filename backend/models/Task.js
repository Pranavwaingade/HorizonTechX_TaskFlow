import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: true,

            trim: true,

        },

        description: {

            type: String,

            default: "",

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "In Progress",

                "Completed",

            ],

            default: "Pending",

        },

        priority: {

            type: String,

            enum: [

                "Low",

                "Medium",

                "High",

            ],

            default: "Medium",

        },

        dueDate: {

            type: Date,

        },

        project: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Project",

            required: true,

        },

        owner: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

    },

    {

        timestamps: true,

    }

);

export default mongoose.model(
    "Task",
    taskSchema
);