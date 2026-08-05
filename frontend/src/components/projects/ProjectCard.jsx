import { FolderKanban, CalendarDays } from "lucide-react";
import "./ProjectCard.css";

function ProjectCard({ project }) {

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

    </div>

  );
}

export default ProjectCard;