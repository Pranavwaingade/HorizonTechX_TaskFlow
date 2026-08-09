import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    CheckSquare,
    Flag,
} from "lucide-react";

import API from "../services/api";

import "./TaskDetails.css";
import Comments from "../components/tasks/Comments";

function TaskDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchTask();

    }, [id]);


    const fetchTask = async () => {

        try {

            const { data } = await API.get(`/tasks/${id}`);

            setTask(data.task);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };


    const formatDate = (date) => {

        if (!date) return "No Due Date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    };


    if (loading) {

        return (

            <div className="task-details-loading">

                Loading Task...

            </div>

        );

    }


    if (!task) {

        return (

            <div className="task-details-empty">

                <h2>Task Not Found 😕</h2>

                <button
                    onClick={() => navigate("/tasks")}
                >
                    Back to Tasks
                </button>

            </div>

        );

    }


    return (

        <section className="task-details-page">

            {/* Back Button */}

            <button
                className="back-btn"
                onClick={() => navigate("/tasks")}
            >

                <ArrowLeft size={18} />

                Back to Tasks

            </button>


            {/* Task Details */}

            <div className="task-details-card">

                <div className="task-details-icon">

                    <CheckSquare
                        size={42}
                        color="var(--primary)"
                    />

                </div>


                <h1>{task.title}</h1>


                <span
                    className={`status status-${task.status
                        ?.toLowerCase()
                        ?.replace(/\s/g, "-")}`}
                >

                    {task.status}

                </span>


                <p className="task-details-description">

                    {task.description || "No Description"}

                </p>


                <div className="task-details-info">

                    <div>

                        <CalendarDays size={18} />

                        <span>

                            {formatDate(task.dueDate)}

                        </span>

                    </div>


                    <div>

                        <Flag size={18} />

                        <span>

                            {task.priority}

                        </span>

                    </div>

                </div>


                {/* Comments will come here */}
                <div className="comments-section">

                    <Comments taskId={task._id} />

                </div>

            </div>

        </section>

    );

}

export default TaskDetails;