import TaskCard from "./TaskCard";

import "./KanbanBoard.css";


function KanbanBoard({
    tasks = [],
    onEdit,
    onDelete,
}) {

    // Separate Tasks By Status

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    );

    const progressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    );

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    );


    // Render Tasks

    const renderTasks = (taskList) => {

        if (taskList.length === 0) {

            return (
                <div className="empty-kanban">

                    <p>
                        No tasks
                    </p>

                </div>
            );

        }


        return taskList.map((task) => (

            <TaskCard
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
            />

        ));

    };


    // UI

    return (

        <div className="kanban-board">


                {/* Pending */}

            <div className="kanban-column">

                <div className="kanban-column-header">

                    <h3>
                        📌 To Do
                    </h3>

                    <span>
                        {pendingTasks.length}
                    </span>

                </div>


                <div className="kanban-tasks">

                    {renderTasks(pendingTasks)}

                </div>

            </div>


                {/* In Progress */}

            <div className="kanban-column">

                <div className="kanban-column-header">

                    <h3>
                        🚀 In Progress
                    </h3>

                    <span>
                        {progressTasks.length}
                    </span>

                </div>


                <div className="kanban-tasks">

                    {renderTasks(progressTasks)}

                </div>

            </div>


             {/*Completed*/}

            <div className="kanban-column">

                <div className="kanban-column-header">

                    <h3>
                        ✅ Completed
                    </h3>

                    <span>
                        {completedTasks.length}
                    </span>

                </div>


                <div className="kanban-tasks">

                    {renderTasks(completedTasks)}

                </div>

            </div>

        </div>

    );

}


export default KanbanBoard;