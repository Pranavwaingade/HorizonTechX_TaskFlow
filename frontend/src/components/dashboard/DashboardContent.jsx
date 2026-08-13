import { useEffect, useState } from "react";
import {
    FolderKanban,
    CheckSquare,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import API from "../../services/api";

import "./DashboardContent.css";


function DashboardContent() {

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchDashboardContent = async () => {

            try {

                const { data } =
                    await API.get("/dashboard");

                setProjects(
                    data.recentProjects || []
                );

                setTasks(
                    data.todayTasks || []
                );

            } catch (error) {

                console.log(
                    "Dashboard content error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchDashboardContent();

    }, []);


    const formatDate = (date) => {

        if (!date) {
            return "No due date";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
            }
        );

    };


    const getStatusClass = (status) => {

        if (status === "Completed") {
            return "completed";
        }

        if (status === "In Progress") {
            return "progress";
        }

        return "pending";

    };


    return (

        <section className="dashboard-content">

            {/* ==============================
                Recent Projects
            ============================== */}

            <div className="dashboard-section-card">

                <div className="section-card-header">

                    <div>

                        <h2>

                            <FolderKanban size={19} />

                            Recent Projects

                        </h2>

                        <p>
                            Your latest projects
                        </p>

                    </div>


                    <Link
                        to="/projects"
                        className="view-all-btn"
                    >

                        View All

                        <ArrowRight size={15} />

                    </Link>

                </div>


                {loading ? (

                    <div className="dashboard-empty">

                        Loading projects...

                    </div>

                ) : projects.length === 0 ? (

                    <div className="dashboard-empty">

                        <FolderKanban size={28} />

                        <p>
                            No projects yet
                        </p>

                        <span>
                            Create your first project
                            to get started.
                        </span>

                    </div>

                ) : (

                    <div className="project-list">

                        {projects.map((project) => (

                            <Link
                                key={project._id}
                                to={`/projects/${project._id}`}
                                className="dashboard-project-item"
                            >

                                <div className="project-icon">

                                    <FolderKanban
                                        size={18}
                                    />

                                </div>


                                <div className="project-info">

                                    <h4>
                                        {project.title}
                                    </h4>

                                    <p>
                                        {project.description ||
                                            "No description"}
                                    </p>

                                </div>


                                <ArrowRight
                                    size={17}
                                    className="item-arrow"
                                />

                            </Link>

                        ))}

                    </div>

                )}

            </div>


            {/* ==============================
                Recent Tasks
            ============================== */}

            <div className="dashboard-section-card">

                <div className="section-card-header">

                    <div>

                        <h2>

                            <CheckSquare size={19} />

                            Recent Tasks

                        </h2>

                        <p>
                            Latest tasks from your projects
                        </p>

                    </div>


                    <Link
                        to="/tasks"
                        className="view-all-btn"
                    >

                        View All

                        <ArrowRight size={15} />

                    </Link>

                </div>


                {loading ? (

                    <div className="dashboard-empty">

                        Loading tasks...

                    </div>

                ) : tasks.length === 0 ? (

                    <div className="dashboard-empty">

                        <CheckSquare size={28} />

                        <p>
                            No tasks yet
                        </p>

                        <span>
                            Your latest tasks will
                            appear here.
                        </span>

                    </div>

                ) : (

                    <div className="task-list">

                        {tasks.map((task) => (

                            <div
                                key={task._id}
                                className="dashboard-task-item"
                            >

                                <div className="task-info">

                                    <h4>
                                        {task.title}
                                    </h4>

                                    <p>
                                        {task.project?.title ||
                                            "No project"}
                                    </p>

                                </div>


                                <div className="task-right">

                                    <span
                                        className={`task-status ${getStatusClass(
                                            task.status
                                        )}`}
                                    >

                                        {task.status}

                                    </span>


                                    <span className="task-date">

                                        {formatDate(
                                            task.dueDate
                                        )}

                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

}


export default DashboardContent;