import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FolderKanban,
    CalendarDays,
    Pencil,
    Trash2,
} from "lucide-react";

import "./ProjectCard.css";

function ProjectCard({ project, onEdit, onDelete }) {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();


    const formatDate = (date) => {

        if (!date) return "No Due Date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    };


    const handleOpenProject = () => {

        navigate(`/projects/${project._id}`);

    };


    return (

        <div
            className="project-card"
            onDoubleClick={handleOpenProject}
        >

            <div className="project-card-icon">

                <FolderKanban size={32} />

            </div>


            <h3>{project.title}</h3>


            <span
                className={`status status-${project.status
                    ?.toLowerCase()
                    ?.replace(/\s/g, "-")}`}
            >

                {project.status}

            </span>


            <p>
                {project.description || "No Description"}
            </p>


            <div className="due-date">

                <CalendarDays size={16} />

                <span>
                    {formatDate(project.dueDate)}
                </span>

            </div>


            <div className="project-actions">

                <button
                    className="edit-btn"
                    onClick={(e) => {

                        e.stopPropagation();

                        onEdit(project);

                    }}
                >

                    <Pencil size={16} />

                    Edit

                </button>


                <button
                    className="delete-btn"
                    onClick={(e) => {

                        e.stopPropagation();

                        onDelete(project);

                    }}
                >

                    <Trash2 size={16} />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ProjectCard;