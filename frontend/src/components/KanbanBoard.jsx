import TaskCard from "./TaskCard";

import "./KanbanBoard.css";

function KanbanBoard({ tasks }) {

    const todo = tasks.filter((t) => t.status === "todo");

    const progress = tasks.filter(
        (t) => t.status === "progress"
    );

    const done = tasks.filter(
        (t) => t.status === "done"
    );

    return (

        <div className="kanban-board">

            <div className="kanban-column">

                <h3>📌 To Do</h3>

                {todo.map((task) => (

                    <TaskCard

                        key={task.id}

                        task={task}

                    />

                ))}

            </div>

            <div className="kanban-column">

                <h3>🚀 In Progress</h3>

                {progress.map((task) => (

                    <TaskCard

                        key={task.id}

                        task={task}

                    />

                ))}

            </div>

            <div className="kanban-column">

                <h3>✅ Done</h3>

                {done.map((task) => (

                    <TaskCard

                        key={task.id}

                        task={task}

                    />

                ))}

            </div>

        </div>

    );

}

export default KanbanBoard;