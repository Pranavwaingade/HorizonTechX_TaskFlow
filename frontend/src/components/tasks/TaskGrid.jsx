import { useEffect, useState } from "react";
import API from "../../services/api";
import TaskCard from "./TaskCard";
import "./TaskGrid.css";

function TaskGrid({refresh ,onEdit,onDelete,}) {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchTasks();

    }, [refresh]);

    const fetchTasks = async () => {

        try {

            const { data } = await API.get("/tasks");

            setTasks(data.tasks);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h3>Loading Tasks...</h3>;

    }

    if (tasks.length === 0) {

        return (

            <h2
                style={{
                    textAlign: "center",
                    marginTop: "60px",
                    color: "var(--text-light)"
                }}
            >

                No Tasks Found 📝

            </h2>

        );

    }

    return (

        <div className="task-grid">

            {tasks.map((task) => (

                <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}

export default TaskGrid;