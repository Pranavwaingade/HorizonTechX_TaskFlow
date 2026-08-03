import {
  CalendarDays,
  FolderKanban,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">

      <div className="project-top">

        <div className="project-icon">
          <FolderKanban size={28} />
        </div>

        <span className={`status ${project.status.toLowerCase()}`}>
          {project.status}
        </span>

      </div>

      <h2>{project.title}</h2>

      <p>{project.description}</p>

      <div className="progress">

        <div
          className="progress-fill"
          style={{ width: `${project.progress}%` }}
        ></div>

      </div>

      <div className="project-info">

        <span>
          <Users size={16} />
          {project.members} Members
        </span>

        <span>
          {project.tasks} Tasks
        </span>

      </div>

      <div className="project-footer">

        <small>
          <CalendarDays size={15} />
          {project.deadline}
        </small>

        <Link
          to={`/projects/${project.id || 1}`}
          className="open-btn"
        >
          Open
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}

export default ProjectCard;