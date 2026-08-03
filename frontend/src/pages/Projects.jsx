import { useState } from "react";
import { Search, Plus } from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";

import "./Projects.css";

function Projects() {

  const [search, setSearch] = useState("");

  const [projects, setProjects] = useState([

    {
      title: "Website Redesign",
      description: "Modern company website redesign.",
      status: "In Progress",
      progress: 72,
      members: 5,
      tasks: 18,
      deadline: "15 Aug 2026",
    },

    {
      title: "CRM Dashboard",
      description: "Customer relationship management.",
      status: "Completed",
      progress: 100,
      members: 4,
      tasks: 20,
      deadline: "25 Jul 2026",
    },

    {
      title: "TaskFlow Mobile",
      description: "Android & iOS application.",
      status: "Planning",
      progress: 15,
      members: 3,
      tasks: 8,
      deadline: "10 Sep 2026",
    },

  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleCreate = (project) => {

    setProjects((prev) => [

      {
        ...project,
      },

      ...prev,

    ]);

  };

  const filteredProjects = projects.filter((project) =>

    project.title
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <section className="projects-page">

      <div className="projects-header">

        <div>

          <h1>Projects</h1>

          <p>Manage all your team projects.</p>

        </div>

        <button
          className="new-project-btn"
          onClick={() => setOpenModal(true)}
        >

          <Plus size={18} />

          New Project

        </button>

      </div>

      <div className="project-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search Projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="projects-grid">

        {filteredProjects.map((project, index) =>

          <ProjectCard
            key={index}
            project={project}
          />

        )}

      </div>
      <CreateProjectModal

        open={openModal}

        onClose={() => setOpenModal(false)}

        onCreate={handleCreate}

      />
    </section>

  );

}

export default Projects;