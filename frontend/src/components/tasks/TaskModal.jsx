import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../services/api";
import TaskComments from "../comments/TaskComments";

import "./TaskModal.css";


function TaskModal({
    open,
    onClose,
    onSuccess,
    projects = [],
    task = null,
    projectId = "",
}) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
        project: "",
        assignedTo: "",
    });


    const [saving, setSaving] = useState(false);


    // Selected Project

    const selectedProject =
        projects.find(
            (project) =>
                project._id === formData.project
        );


    // Project Members

    const projectMembers =
        selectedProject
            ? [
                ...(selectedProject.owner
                    ? [selectedProject.owner]
                    : []),

                ...(selectedProject.members || []),
            ]
            : [];


    // Prepare Form

    useEffect(() => {

        if (!open) return;


        if (task) {

            setFormData({

                title:
                    task.title || "",

                description:
                    task.description || "",

                status:
                    task.status || "Pending",

                priority:
                    task.priority || "Medium",

                dueDate:
                    task.dueDate
                        ? task.dueDate.substring(0, 10)
                        : "",

                project:
                    task.project?._id ||
                    task.project ||
                    projectId ||
                    "",

                assignedTo:
                    task.assignedTo?._id ||
                    task.assignedTo ||
                    "",

            });

        } else {

            setFormData({

                title: "",

                description: "",

                status: "Pending",

                priority: "Medium",

                dueDate: "",

                project:
                    projectId || "",

                assignedTo: "",

            });

        }

    }, [
        task,
        projectId,
        open,
    ]);


    // Reset Assigned User When Project Changes

    useEffect(() => {

        if (!formData.project) {

            return;

        }


        if (
            formData.assignedTo &&
            !projectMembers.some(
                (member) =>
                    member._id ===
                    formData.assignedTo
            )
        ) {

            setFormData((previous) => ({

                ...previous,

                assignedTo: "",

            }));

        }

    }, [formData.project, projects]);


    // Input Change

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    // Submit

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.title.trim()) {

            toast.error(
                "Task title is required"
            );

            return;

        }


        if (!formData.project) {

            toast.error(
                "Project is required"
            );

            return;

        }


        try {

            setSaving(true);


            const payload = {

                title:
                    formData.title.trim(),

                description:
                    formData.description.trim(),

                status:
                    formData.status,

                priority:
                    formData.priority,

                dueDate:
                    formData.dueDate || null,

                project:
                    formData.project,

                assignedTo:
                    formData.assignedTo || null,

            };


            // Update

            if (task) {

                await API.put(

                    `/tasks/${task._id}`,

                    payload

                );


                toast.success(
                    "Task updated successfully ✅"
                );

            }


            // Create

            else {

                await API.post(

                    "/tasks",

                    payload

                );


                toast.success(
                    "Task created successfully 🎉"
                );

            }


            if (onSuccess) {

                await onSuccess();

            }


            onClose();

        } catch (error) {

            console.log(
                "Task save error:",
                error
            );


            toast.error(

                error.response?.data?.message ||

                "Failed to save task"

            );

        } finally {

            setSaving(false);

        }

    };


    // Close

    const handleClose = () => {

        if (saving) return;

        onClose();

    };


    // Hidden

    if (!open) {

        return null;

    }


    // Project Locked

    const isProjectLocked =
        Boolean(projectId);


    // UI

    return (

        <div

            className="modal-overlay"

            onMouseDown={(e) => {

                if (
                    e.target ===
                    e.currentTarget &&
                    !saving
                ) {

                    handleClose();

                }

            }}

        >

            <div className="task-modal">


                    {/* Header */}

                <div className="task-modal-header">

                    <div>

                        <p className="task-modal-label">
                            Task
                        </p>

                        <h2>

                            {task
                                ? "Edit Task"
                                : "Create Task"}

                        </h2>

                    </div>

                </div>


                    {/* Form */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* Title */}

                    <label>

                        Task Title

                        <input

                            className="input"

                            type="text"

                            name="title"

                            placeholder="Enter task title"

                            value={
                                formData.title
                            }

                            onChange={
                                handleChange
                            }

                            disabled={saving}

                            required

                        />

                    </label>


                    {/* Description */}

                    <label>

                        Description

                        <textarea

                            className="input"

                            name="description"

                            placeholder="Enter task description"

                            value={
                                formData.description
                            }

                            onChange={
                                handleChange
                            }

                            disabled={saving}

                            rows="4"

                        />

                    </label>


                    {/* Project */}

                    {!isProjectLocked && (

                        <label>

                            Project

                            <select

                                className="input"

                                name="project"

                                value={
                                    formData.project
                                }

                                onChange={
                                    handleChange
                                }

                                disabled={saving}

                                required

                            >

                                <option value="">

                                    Select Project

                                </option>


                                {projects.map(
                                    (project) => (

                                        <option

                                            key={
                                                project._id
                                            }

                                            value={
                                                project._id
                                            }

                                        >

                                            {
                                                project.title
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </label>

                    )}


                        {/* Assign To */}

                    <label>

                        Assign To

                        <select

                            className="input"

                            name="assignedTo"

                            value={
                                formData.assignedTo
                            }

                            onChange={
                                handleChange
                            }

                            disabled={
                                saving ||
                                !formData.project
                            }

                        >

                            <option value="">

                                Unassigned

                            </option>


                            {projectMembers.map(
                                (member) => (

                                    <option

                                        key={
                                            member._id
                                        }

                                        value={
                                            member._id
                                        }

                                    >

                                        {
                                            member.name ||
                                            member.email
                                        }

                                        {
                                            member._id ===
                                            selectedProject?.owner?._id
                                                ? " (Owner)"
                                                : ""
                                        }

                                    </option>

                                )
                            )}

                        </select>


                        {!formData.project && (

                            <small>

                                Select a project
                                first.

                            </small>

                        )}


                        {formData.project &&
                            projectMembers.length === 0 && (

                                <small>

                                    No members found
                                    in this project.

                                </small>

                            )}

                    </label>


                    {/* Date */}

                    <label>

                        Due Date

                        <input

                            className="input"

                            type="date"

                            name="dueDate"

                            value={
                                formData.dueDate
                            }

                            onChange={
                                handleChange
                            }

                            disabled={saving}

                        />

                    </label>


                    {/* Priority */}

                    <label>

                        Priority

                        <select

                            className="input"

                            name="priority"

                            value={
                                formData.priority
                            }

                            onChange={
                                handleChange
                            }

                            disabled={saving}

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

                    </label>


                    {/* Status */}

                    <label>

                        Status

                        <select

                            className="input"

                            name="status"

                            value={
                                formData.status
                            }

                            onChange={
                                handleChange
                            }

                            disabled={saving}

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

                    </label>


                    {/* Buttons */}

                    <div className="modal-buttons">

                        <button

                            type="button"

                            className="secondary-btn"

                            onClick={
                                handleClose
                            }

                            disabled={saving}

                        >

                            Cancel

                        </button>


                        <button

                            type="submit"

                            className="primary-btn"

                            disabled={saving}

                        >

                            {saving

                                ? task
                                    ? "Updating..."
                                    : "Creating..."

                                : task
                                    ? "Update Task"
                                    : "Create Task"

                            }

                        </button>

                    </div>

                </form>


                {/* Comments */}

                {task && (

                    <TaskComments
                        taskId={task._id}
                    />

                )}

            </div>

        </div>

    );

}


export default TaskModal;