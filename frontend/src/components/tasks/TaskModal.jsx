import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import "./TaskModal.css";

function TaskModal({
    open,
    onClose,
    onSuccess,
    projects = [],
    task,
    projectId = "",
}) {

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
                project:
                    task.project?._id ||
                    task.project ||
                    projectId,
            });

        } else {

            setFormData({
                title: "",
                description: "",
                status: "Pending",
                priority: "Medium",
                dueDate: "",
                project: projectId || "",
            });

        }

    }, [task, projectId]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (!formData.project) {

                toast.error("Project is required");

                return;
            }

            if (task) {

                await API.put(
                    `/tasks/${task._id}`,
                    formData
                );

                toast.success("Task Updated ✅");

            } else {

                await API.post(
                    "/tasks",
                    formData
                );

                toast.success("Task Created ✅");
            }

            onSuccess();
            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
    };

    if (!open) return null;

    // Project Details मधून projectId आला असेल
    const isProjectLocked = Boolean(projectId);

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
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="input"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    {!isProjectLocked && (
                        <select
                            className="input"
                            name="project"
                            value={formData.project}
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
                    )}

                    <input
                        className="input"
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />

                    <select
                        className="input"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                    </select>

                    <select
                        className="input"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

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
                            {task
                                ? "Update Task"
                                : "Create Task"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default TaskModal;