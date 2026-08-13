import { useEffect, useMemo, useState } from "react";
import {
    ListTodo,
    Plus,
    Search,
    Filter,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/tasks/TaskModal";

import "./Tasks.css";


function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [priorityFilter, setPriorityFilter] =
        useState("All");

    const [taskModalOpen, setTaskModalOpen] =
        useState(false);

    const [editingTask, setEditingTask] =
        useState(null);


    // ========================================
    // Fetch Tasks
    // ========================================

    const fetchTasks = async () => {

        try {

            setLoading(true);

            const { data } =
                await API.get("/tasks");

            setTasks(data.tasks || []);

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

            setLoading(false);

        }

    };


    // ========================================
    // Fetch Projects
    // ========================================

    const fetchProjects = async () => {

        try {

            const { data } =
                await API.get("/projects");

            setProjects(
                data.projects || []
            );

        } catch (error) {

            console.log(
                "Projects error:",
                error
            );

        }

    };


    // ========================================
    // Page Load
    // ========================================

    useEffect(() => {

        fetchTasks();

        fetchProjects();

    }, []);


    // ========================================
    // Filter Tasks
    // ========================================

    const filteredTasks = useMemo(() => {

        return tasks.filter((task) => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();


            const matchesSearch =
                !searchValue ||
                task.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchValue);


            const matchesStatus =
                statusFilter === "All" ||
                task.status === statusFilter;


            const matchesPriority =
                priorityFilter === "All" ||
                task.priority === priorityFilter;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );

        });

    }, [
        tasks,
        search,
        statusFilter,
        priorityFilter,
    ]);


    // ========================================
    // Create Task
    // ========================================

    const handleCreateTask = () => {

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
    // Close Modal
    // ========================================

    const handleCloseModal = () => {

        setTaskModalOpen(false);

        setEditingTask(null);

    };


    // ========================================
    // UI
    // ========================================

    return (

        <section className="tasks-page">


            {/* =================================
                Header
            ================================= */}

            <div className="tasks-header">

                <div>

                    <p className="page-label">
                        Workspace
                    </p>

                    <h1>
                        Tasks
                    </h1>

                    <p className="page-description">
                        Manage all your tasks from one place.
                    </p>

                </div>


                <button
                    type="button"
                    className="create-task-btn"
                    onClick={handleCreateTask}
                >

                    <Plus size={18} />

                    Create Task

                </button>

            </div>


            {/* =================================
                Filters
            ================================= */}

            <div className="tasks-toolbar">


                {/* Search */}

                <div className="task-search">

                    <Search size={17} />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {/* Status */}

                <div className="task-filter">

                    <Filter size={15} />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Status
                        </option>

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

                </div>


                {/* Priority */}

                <div className="task-filter">

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Priority
                        </option>

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

                </div>

            </div>


            {/* =================================
                Loading
            ================================= */}

            {loading && (

                <div className="tasks-state">

                    <ListTodo size={30} />

                    <p>
                        Loading tasks...
                    </p>

                </div>

            )}


            {/* =================================
                Empty
            ================================= */}

            {!loading &&
                filteredTasks.length === 0 && (

                    <div className="tasks-state">

                        <div className="empty-task-icon">

                            <ListTodo size={32} />

                        </div>

                        <h2>
                            No tasks found
                        </h2>

                        <p>
                            {tasks.length === 0
                                ? "Create your first task to get started."
                                : "Try changing your search or filters."}
                        </p>


                        {tasks.length === 0 && (

                            <button
                                type="button"
                                className="create-task-btn"
                                onClick={handleCreateTask}
                            >

                                <Plus size={17} />

                                Create Your First Task

                            </button>

                        )}

                    </div>

                )}


            {/* =================================
                Task Grid
            ================================= */}

            {!loading &&
                filteredTasks.length > 0 && (

                    <div className="tasks-grid">

                        {filteredTasks.map((task) => (

                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />

                        ))}

                    </div>

                )}


            {/* =================================
                Task Modal
            ================================= */}

            <TaskModal
                open={taskModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleTaskSuccess}
                task={editingTask}
                projects={projects}
            />

        </section>

    );

}


export default Tasks;