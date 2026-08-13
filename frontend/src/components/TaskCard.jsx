import {
    CalendarDays,
    User,
    Flag,
    Pencil,
    Trash2,
} from "lucide-react";

import "./TaskCard.css";


function TaskCard({
    task,
    onEdit,
    onDelete,
}) {


    // ========================================
    // Format Date
    // ========================================

    const formatDate = (date) => {

        if (!date) {

            return "No due date";

        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "No due date";

        }


        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ========================================
    // Assigned User
    // ========================================

    const assignedUser =
        task.assignedTo || null;


    const assignedUserName =
        assignedUser?.name ||
        assignedUser?.email ||
        "Unassigned";


    // ========================================
    // Priority
    // ========================================

    const priority =
        task.priority || "Medium";


    // ========================================
    // Status
    // ========================================

    const status =
        task.status || "Pending";


    // ========================================
    // UI
    // ========================================

    return (

        <article className="task-card">


            {/* =================================
                Title
            ================================= */}

            <h4>
                {task.title}
            </h4>


            {/* =================================
                Description
            ================================= */}

            {task.description && (

                <p className="task-description">

                    {task.description}

                </p>

            )}


            {/* =================================
                Meta
            ================================= */}

            <div className="task-meta">


                {/* Priority */}

                <span
                    className={
                        `priority ${priority.toLowerCase()}`
                    }
                >

                    <Flag size={14} />

                    {priority}

                </span>


                {/* Assigned User */}

                <span className="task-assignee">

                    <User size={14} />

                    {assignedUserName}

                </span>

            </div>


            {/* =================================
                Status
            ================================= */}

            <div className="task-status">

                <span
                    className={
                        `status-badge ${status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`
                    }
                >

                    {status}

                </span>

            </div>


            {/* =================================
                Deadline
            ================================= */}

            <div className="task-footer">

                <CalendarDays size={14} />

                <span>

                    {formatDate(
                        task.dueDate
                    )}

                </span>

            </div>


            {/* =================================
                Actions
            ================================= */}

            {(onEdit || onDelete) && (

                <div className="task-actions">


                    {/* Edit */}

                    {onEdit && (

                        <button
                            type="button"
                            className="task-edit-btn"
                            onClick={(e) => {

                                e.stopPropagation();

                                onEdit(task);

                            }}
                        >

                            <Pencil size={14} />

                            Edit

                        </button>

                    )}


                    {/* Delete */}

                    {onDelete && (

                        <button
                            type="button"
                            className="task-delete-btn"
                            onClick={(e) => {

                                e.stopPropagation();

                                onDelete(
                                    task._id
                                );

                            }}
                        >

                            <Trash2 size={14} />

                            Delete

                        </button>

                    )}

                </div>

            )}

        </article>

    );

}


export default TaskCard;