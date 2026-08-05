import { Search, Plus } from "lucide-react";
import "./ProjectHeader.css";

function ProjectHeader({ onCreate }) {

  return (
    <div className="project-header">

      <div>
        <h1>Projects</h1>
        <p>Manage all your projects in one place.</p>
      </div>

      <div className="project-actions">

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Projects..."
          />
        </div>

        <button
          className="create-btn"
          onClick={onCreate}
        >
          <Plus size={18} />
          Create Project
        </button>

      </div>

    </div>
  );
}

export default ProjectHeader;