import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import "./TaskModal.css";

function TaskModal({ open, onClose, onSuccess, projects, task, }) {

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
        project: "",

    });
    useEffect(() => {

        if (task) {

            setFormData({

                title: task.title || "",

                description: task.description || "",

                status: task.status || "Pending",

                priority: task.priority || "Medium",

                dueDate: task.dueDate
                    ? task.dueDate.substring(0, 10)
                    : "",

                project: task.project?._id || task.project,

            });

        }

        else {

            setFormData({

                title: "",

                description: "",

                status: "Pending",

                priority: "Medium",

                dueDate: "",

                project: "",

            });

        }

    }, [task]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (task) {

                await API.put(

                    `/tasks/${task._id}`,

                    formData

                );

                toast.success("Task Updated ✅");

            }

            else {

                await API.post(

                    "/tasks",

                    formData

                );

                toast.success("Task Created ✅");

            }

            onSuccess();

            onClose();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="task-modal">

                <h2>

                    {task ? "Edit Task" : "Create Task"}

                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="input"
                        name="title"
                        placeholder="Task Title"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="input"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                    />

                    <select
                        className="input"
                        name="project"
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Project
                        </option>

                        {projects.map((project) => (

                            <option
                                key={project._id}
                                value={project._id}
                            >

                                {project.title}

                            </option>

                        ))}

                    </select>

                    <input
                        className="input"
                        type="date"
                        name="dueDate"
                        onChange={handleChange}
                    />

                    <select
                        className="input"
                        name="priority"
                        onChange={handleChange}
                    >

                        <option>Low</option>

                        <option>Medium</option>

                        <option>High</option>

                    </select>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="primary-btn"
                        >

                            {task ? "Update Task" : "Create Task"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default TaskModal;