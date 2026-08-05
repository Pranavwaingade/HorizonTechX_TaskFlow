import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectGrid from "../components/projects/ProjectGrid";
import CreateProjectModal from "../components/projects/CreateProjectModal";

function Projects() {

  const [openModal, setOpenModal] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectCreated = () => {

    setRefresh(prev => !prev);

    setOpenModal(false);

  };

  const handleEdit = (project) => {

    setSelectedProject(project);

    setOpenModal(true);

};
const handleDelete = async (project) => {

    const confirmDelete = window.confirm(
        `Are you sure you want to delete "${project.title}" ?`
    );

    if (!confirmDelete) return;

    try {

        await API.delete(`/projects/${project._id}`);

        toast.success("Project Deleted Successfully 🗑️");

        setRefresh(prev => !prev);

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Failed to delete project"
        );

    }

};

  return (
    <>
      <ProjectHeader
        onCreate={() => setOpenModal(true)}
      />

      <ProjectGrid
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateProjectModal
        open={openModal}
        onClose={() => {setOpenModal(false);setSelectedProject(null);}}
        onProjectCreated={handleProjectCreated}
        project={selectedProject}
      />
    </>
  );
}

export default Projects;