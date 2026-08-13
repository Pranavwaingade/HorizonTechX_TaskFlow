import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    FolderKanban,
    Users,
    Plus,
    UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";

import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/tasks/TaskModal";

import "./ProjectDetails.css";


function ProjectDetails() {

    const { id } = useParams();


    // ========================================
    // State
    // ========================================

    const [project, setProject] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [tasksLoading, setTasksLoading] =
        useState(true);

    const [taskModalOpen, setTaskModalOpen] =
        useState(false);

    const [editingTask, setEditingTask] =
        useState(null);


    // ========================================
    // Fetch Project
    // ========================================

    const fetchProject = async () => {

        try {

            setLoading(true);

            const { data } =
                await API.get(`/projects/${id}`);

            setProject(data.project);

        } catch (error) {

            console.log(
                "Project details error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load project"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // Fetch Tasks
    // ========================================

    const fetchTasks = async () => {

        try {

            setTasksLoading(true);

            const { data } =
                await API.get("/tasks");


            const allTasks =
                data.tasks || [];


            const projectTasks =
                allTasks.filter((task) => {

                    const taskProjectId =
                        task.project?._id ||
                        task.project;

                    return (
                        taskProjectId?.toString() ===
                        id?.toString()
                    );

                });


            setTasks(projectTasks);

        } catch (error) {

            console.log(
                "Tasks error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load tasks"
            );

        } finally {

            setTasksLoading(false);

        }

    };


    // ========================================
    // Initial Load
    // ========================================

    useEffect(() => {

        if (!id) return;

        fetchProject();

        fetchTasks();

    }, [id]);


    // ========================================
    // Create Task
    // ========================================

    const handleAddTask = () => {

        setEditingTask(null);

        setTaskModalOpen(true);

    };


    // ========================================
    // Edit Task
    // ========================================

    const handleEditTask = (task) => {

        setEditingTask(task);

        setTaskModalOpen(true);

    };


    // ========================================
    // Delete Task
    // ========================================

    const handleDeleteTask = async (taskId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this task?"
            );


        if (!confirmed) return;


        try {

            await API.delete(
                `/tasks/${taskId}`
            );

            toast.success(
                "Task deleted successfully 🗑️"
            );

            fetchTasks();

        } catch (error) {

            console.log(
                "Delete task error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to delete task"
            );

        }

    };


    // ========================================
    // Task Success
    // ========================================

    const handleTaskSuccess = () => {

        fetchTasks();

    };


    // ========================================
    // Close Task Modal
    // ========================================

    const handleCloseTaskModal = () => {

        setTaskModalOpen(false);

        setEditingTask(null);

    };


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (

            <section className="project-details-page">

                <div className="project-details-state">

                    <FolderKanban size={30} />

                    <p>
                        Loading project...
                    </p>

                </div>

            </section>

        );

    }


    // ========================================
    // Project Not Found
    // ========================================

    if (!project) {

        return (

            <section className="project-details-page">

                <Link
                    to="/projects"
                    className="project-back-btn"
                >

                    <ArrowLeft size={17} />

                    Back to Projects

                </Link>


                <div className="project-details-state">

                    <FolderKanban size={30} />

                    <h2>
                        Project not found
                    </h2>

                    <p>
                        This project may have been
                        deleted or you don't have access.
                    </p>

                </div>

            </section>

        );

    }


    // ========================================
    // Members
    // ========================================

    const members =
        project.members || [];


    // ========================================
    // UI
    // ========================================

    return (

        <section className="project-details-page">


            {/* =================================
                Back
            ================================= */}

            <Link
                to="/projects"
                className="project-back-btn"
            >

                <ArrowLeft size={17} />

                Back to Projects

            </Link>


            {/* =================================
                Project Header
            ================================= */}

            <div className="project-details-header">

                <div className="project-details-icon">

                    <FolderKanban size={24} />

                </div>


                <div className="project-details-heading">

                    <p className="page-label">
                        Project
                    </p>

                    <h1>
                        {project.title}
                    </h1>

                    <p className="project-description">

                        {project.description ||
                            "No project description"}

                    </p>

                </div>


                {/* Add Task */}

                <button
                    type="button"
                    className="project-add-task-btn"
                    onClick={handleAddTask}
                >

                    <Plus size={17} />

                    Add Task

                </button>

            </div>


            {/* =================================
                Team Members
            ================================= */}

            <div className="project-members-section">

                <div className="section-heading">

                    <div>

                        <h2>

                            <Users size={20} />

                            Team Members

                        </h2>

                        <p>
                            People collaborating
                            on this project.
                        </p>

                    </div>


                    <span className="member-count">

                        {members.length}

                        {" "}

                        {members.length === 1
                            ? "Member"
                            : "Members"}

                    </span>

                </div>


                {members.length > 0 ? (

                    <div className="members-grid">

                        {members.map((member) => (

                            <div
                                className="member-card"
                                key={member._id}
                            >

                                <div className="member-avatar">

                                    {member.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}

                                </div>


                                <div>

                                    <h4>
                                        {member.name ||
                                            "Unknown User"}
                                    </h4>

                                    <p>
                                        {member.email ||
                                            "No email"}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="no-members">

                        <Users size={24} />

                        <p>
                            No team members yet.
                        </p>

                    </div>

                )}

            </div>


            {/* =================================
                Tasks
            ================================= */}

            <div className="project-tasks-section">

                <div className="section-heading">

                    <div>

                        <h2>
                            Tasks
                        </h2>

                        <p>
                            Manage tasks for this project.
                        </p>

                    </div>


                    <span className="task-count">

                        {tasks.length}

                        {" "}

                        {tasks.length === 1
                            ? "Task"
                            : "Tasks"}

                    </span>

                </div>


                {tasksLoading ? (

                    <div className="tasks-loading">

                        <FolderKanban size={24} />

                        <p>
                            Loading tasks...
                        </p>

                    </div>

                ) : (

                    <KanbanBoard
                        tasks={tasks}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                    />

                )}

            </div>


            {/* =================================
                Task Modal
            ================================= */}

            <TaskModal
                open={taskModalOpen}
                onClose={handleCloseTaskModal}
                onSuccess={handleTaskSuccess}
                task={editingTask}
                projectId={id}
                projects={[]}
            />

        </section>

    );

}


export default ProjectDetails;