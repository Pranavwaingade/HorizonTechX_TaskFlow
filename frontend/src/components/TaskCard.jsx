import {
    CalendarDays,
    User,
    Flag,
    Pencil,
    Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./TaskCard.css";


function TaskCard({
    task,
    onEdit,
    onDelete,
}) {

    const navigate = useNavigate();

    const { user } = useAuth();


    // Format Date

    const formatDate = (date) => {

        if (!date) {
            return "No due date";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // Task Owner

    const ownerName =
        task.owner?.name ||
        "Unassigned";

        const assigneeName =
    task.assignedTo?.name ||
    "Unassigned";

    const taskOwnerId =
        task.owner?._id ||
        task.owner;


    // Current Logged-in User

    const currentUserId =
        user?._id ||
        user?.id;


    // Owner Permission

    const isTaskOwner =
        currentUserId &&
        taskOwnerId &&
        currentUserId.toString() ===
        taskOwnerId.toString();


    // Priority

    const priority =
        task.priority ||
        "Medium";


    // Open Task Details

    const handleCardClick = () => {

        if (!task?._id) {
            return;
        }

        navigate(
            `/tasks/${task._id}`
        );

    };


    // UI

    return (

        <div
            className="task-card"
            onClick={handleCardClick}
        >

                {/* Task Title */}

            <h4>
                {task.title}
            </h4>


                {/* Description */}

            {task.description && (

                <p>
                    {task.description}
                </p>

            )}


                {/* Task Meta */}

            <div className="task-meta">

                {/* Priority */}

                <span
                    className={`priority ${priority.toLowerCase()}`}
                >

                    <Flag size={15} />

                    {priority}

                </span>


                {/* Owner */}

                <span>

                    <User size={15} />

                    {assigneeName}

                </span>

            </div>


                {/* Due Date */}

            <div className="task-footer">

                <span>

                    <CalendarDays size={15} />

                    {formatDate(
                        task.dueDate
                    )}

                </span>

            </div>


                {/* Owner Actions */}

            {isTaskOwner &&
                (onEdit || onDelete) && (

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

                                <Pencil
                                    size={15}
                                />

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

                                <Trash2
                                    size={15}
                                />

                                Delete

                            </button>

                        )}

                    </div>

                )}

        </div>

    );

}


export default TaskCard;