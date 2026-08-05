import { useState } from "react";
import {
  FolderKanban,
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import "./ProjectCard.css";

function ProjectCard({ project, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return "No Due Date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="project-card">
    <FolderKanban
        size={40}
        color="var(--primary)"
      />

      <h3>{project.title}</h3>

      <span
        className={`status status-${project.status
          ?.toLowerCase()
          ?.replace(/\s/g, "-")}`}
      >
        {project.status}
      </span>

      <p>{project.description || "No Description"}</p>

      <div className="due-date">
        <CalendarDays size={16} />
        <span>{formatDate(project.dueDate)}</span>
      </div>
      <div className="project-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(project)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(project)}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;