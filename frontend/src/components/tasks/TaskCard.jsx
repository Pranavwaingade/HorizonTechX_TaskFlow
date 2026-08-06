import {
  CheckSquare,
  CalendarDays,
  Flag,
  Pencil,
  Trash2,
} from "lucide-react";

import "./TaskCard.css";

function TaskCard({ task, onEdit, onDelete }) {
  const formatDate = (date) => {
    if (!date) return "No Due Date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="task-card">

      <CheckSquare
        size={40}
        color="var(--primary)"
      />

      <h3>{task.title}</h3>

      <span
        className={`status status-${task.status
          ?.toLowerCase()
          ?.replace(/\s/g, "-")}`}
      >
        {task.status}
      </span>

      <p>{task.description || "No Description"}</p>

      <div className="task-footer">

        <div>
          <CalendarDays size={16} />
          <span>{formatDate(task.dueDate)}</span>
        </div>

        <div>
          <Flag size={16} />
          <span>{task.priority}</span>
        </div>

      </div>

      <div className="task-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task)}
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;