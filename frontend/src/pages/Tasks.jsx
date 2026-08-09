import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import TaskHeader from "../components/tasks/TaskHeader";
import TaskGrid from "../components/tasks/TaskGrid";
import TaskModal from "../components/tasks/TaskModal";

import toast from "react-hot-toast";

function Tasks() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [projects, setProjects] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const [editingTask, setEditingTask] = useState(null);


    // ==============================
    // Fetch Projects
    // ==============================

    useEffect(() => {

        fetchProjects();

    }, []);


    const fetchProjects = async () => {

        try {

            const { data } = await API.get("/projects");

            setProjects(data.projects);

        }

        catch (error) {

            console.log(error);

        }

    };


    // ==============================
    // Delete Task
    // ==============================

    const handleDelete = async (task) => {

        const confirmDelete = window.confirm(
            `Delete "${task.title}" ?`
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/tasks/${task._id}`);

            toast.success("Task Deleted 🗑️");

            setRefresh(prev => !prev);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete task"
            );

        }

    };


    // ==============================
    // Edit Task
    // ==============================

    const handleEdit = (task) => {

        setEditingTask(task);

        setOpen(true);

    };


    // ==============================
    // Open Task Details
    // ==============================

    const handleOpenTask = (task) => {

        navigate(`/tasks/${task._id}`);

    };


    return (

        <>

            <TaskHeader
                onCreate={() => {

                    setEditingTask(null);

                    setOpen(true);

                }}
            />


            <TaskGrid

                refresh={refresh}

                onEdit={handleEdit}

                onDelete={handleDelete}

                onOpen={handleOpenTask}

            />


            <TaskModal

                open={open}

                onClose={() => {

                    setOpen(false);

                    setEditingTask(null);

                }}

                projects={projects}

                task={editingTask}

                onSuccess={() => {

                    setRefresh(prev => !prev);

                }}

            />

        </>

    );

}

export default Tasks;