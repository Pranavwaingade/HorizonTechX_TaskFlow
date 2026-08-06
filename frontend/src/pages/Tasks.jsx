import { useEffect, useState } from "react";

import API from "../services/api";

import TaskHeader from "../components/tasks/TaskHeader";
import TaskGrid from "../components/tasks/TaskGrid";
import TaskModal from "../components/tasks/TaskModal";
import toast from "react-hot-toast";

function Tasks() {

    const [open, setOpen] = useState(false);

    const [projects, setProjects] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const [editingTask, setEditingTask] = useState(null);

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

    const handleEdit = (task) => {

        setEditingTask(task);

        setOpen(true);

    };
    return (

        <>

            <TaskHeader
                onCreate={() => setOpen(true)}
            />

            <TaskGrid
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <TaskModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditingTask(null);
                }}
                projects={projects}
                task={editingTask}
                onSuccess={() => setRefresh(prev => !prev)}
            />
        </>

    );

}

export default Tasks;