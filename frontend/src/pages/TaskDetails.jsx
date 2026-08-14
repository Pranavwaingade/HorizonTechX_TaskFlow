import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Flag,
    User,
    FolderKanban,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";
import TaskComments from "../components/comments/TaskComments";

import "./TaskDetails.css";


function TaskDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);


    // ========================================
    // Fetch Task
    // ========================================

    const fetchTask = async () => {

        try {

            setLoading(true);

            const { data } = await API.get(
                `/tasks/${id}`
            );

            setTask(data.task);

        } catch (error) {

            console.log(
                "Task details error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load task"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // Load
    // ========================================

    useEffect(() => {

        if (!id) return;

        fetchTask();

    }, [id]);


    // ========================================
    // Format Date
    // ========================================

    const formatDate = (date) => {

        if (!date) {
            return "No due date";
        }

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (

            <section className="task-details-page">

                <div className="task-details-state">

                    Loading task...

                </div>

            </section>

        );

    }


    // ========================================
    // Not Found
    // ========================================

    if (!task) {

        return (

            <section className="task-details-page">

                <div className="task-details-state">

                    <h2>
                        Task not found
                    </h2>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        Go Back
                    </button>

                </div>

            </section>

        );

    }


    // ========================================
    // Data
    // ========================================

    const priority =
        task.priority || "Medium";

    const assignedUser =
        task.assignedTo?.name ||
        task.assignedTo?.email ||
        "Unassigned";

    const projectTitle =
        task.project?.title ||
        "No Project";


    // ========================================
    // UI
    // ========================================

    return (

        <section className="task-details-page">

            {/* =================================
                Top
            ================================= */}

            <div className="task-details-top">

                <Link
                    to={
                        task.project?._id
                            ? `/projects/${task.project._id}`
                            : "/dashboard"
                    }
                    className="task-back-btn"
                >

                    <ArrowLeft size={18} />

                    Back

                </Link>

            </div>


            {/* =================================
                Main Task Card
            ================================= */}

            <div className="task-details-card">

                {/* Header */}

                <div className="task-details-header">

                    <div>

                        <span className="task-details-label">
                            Task Details
                        </span>

                        <h1>
                            {task.title}
                        </h1>

                    </div>

                    <span
                        className={`task-status ${task.status
                            ?.toLowerCase()
                            .replace(
                                /\s+/g,
                                "-"
                            )}`}
                    >
                        {task.status}
                    </span>

                </div>


                {/* Description */}

                <div className="task-description">

                    <h3>
                        Description
                    </h3>

                    <p>

                        {task.description ||
                            "No description available."}

                    </p>

                </div>


                {/* Task Information */}

                <div className="task-info-grid">


                    {/* Priority */}

                    <div className="task-info-item">

                        <div className="task-info-icon">

                            <Flag size={18} />

                        </div>

                        <div>

                            <span>
                                Priority
                            </span>

                            <strong
                                className={`detail-priority ${priority.toLowerCase()}`}
                            >
                                {priority}
                            </strong>

                        </div>

                    </div>


                    {/* Assigned */}

                    <div className="task-info-item">

                        <div className="task-info-icon">

                            <User size={18} />

                        </div>

                        <div>

                            <span>
                                Assigned To
                            </span>

                            <strong>
                                {assignedUser}
                            </strong>

                        </div>

                    </div>


                    {/* Due Date */}

                    <div className="task-info-item">

                        <div className="task-info-icon">

                            <CalendarDays
                                size={18}
                            />

                        </div>

                        <div>

                            <span>
                                Due Date
                            </span>

                            <strong>
                                {formatDate(
                                    task.dueDate
                                )}
                            </strong>

                        </div>

                    </div>


                    {/* Project */}

                    <div className="task-info-item">

                        <div className="task-info-icon">

                            <FolderKanban
                                size={18}
                            />

                        </div>

                        <div>

                            <span>
                                Project
                            </span>

                            <strong>
                                {projectTitle}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Created Date */}

                <div className="task-created">

                    Created{" "}

                    {formatDate(
                        task.createdAt
                    )}

                </div>

            </div>


            {/* =================================
                Comments
            ================================= */}

            <TaskComments
                taskId={task._id}
            />

        </section>

    );

}


export default TaskDetails;