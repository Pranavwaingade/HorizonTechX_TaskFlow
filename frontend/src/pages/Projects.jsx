import { useEffect, useState } from "react";

import {
    FolderKanban,
    Plus,
    ArrowRight,
    Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import ProjectModal from "../components/projects/ProjectModal";

import "./Projects.css";


function Projects() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [projectModalOpen, setProjectModalOpen] =
        useState(false);

    const [editingProject, setEditingProject] =
        useState(null);


    // ========================================
    // Fetch Projects
    // ========================================

    const fetchProjects = async () => {

        try {

            setLoading(true);

            const { data } =
                await API.get("/projects");

            setProjects(
                data.projects || []
            );

        } catch (error) {

            console.log(
                "Projects error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load projects"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // Page Load
    // ========================================

    useEffect(() => {

        fetchProjects();

    }, []);


    // ========================================
    // Open Create Modal
    // ========================================

    const handleCreateProject = () => {

        setEditingProject(null);

        setProjectModalOpen(true);

    };


    // ========================================
    // Close Modal
    // ========================================

    const handleCloseModal = () => {

        setProjectModalOpen(false);

        setEditingProject(null);

    };


    // ========================================
    // Project Saved
    // ========================================

    const handleProjectSuccess = () => {

        fetchProjects();

    };


    // ========================================
    // UI
    // ========================================

    return (

        <section className="projects-page">


            {/* =================================
                Header
            ================================= */}

            <div className="projects-header">

                <div>

                    <p className="page-label">
                        Workspace
                    </p>

                    <h1>
                        Projects
                    </h1>

                    <p className="page-description">
                        Manage your projects and
                        collaborate with your team.
                    </p>

                </div>


                <button
                    type="button"
                    className="create-project-btn"
                    onClick={handleCreateProject}
                >

                    <Plus size={18} />

                    Create Project

                </button>

            </div>


            {/* =================================
                Loading
            ================================= */}

            {loading && (

                <div className="projects-state">

                    <FolderKanban size={30} />

                    <p>
                        Loading projects...
                    </p>

                </div>

            )}


            {/* =================================
                Empty
            ================================= */}

            {!loading &&
                projects.length === 0 && (

                    <div className="projects-state">

                        <div className="empty-project-icon">

                            <FolderKanban size={32} />

                        </div>

                        <h2>
                            No projects yet
                        </h2>

                        <p>
                            Create your first project
                            to start managing your work.
                        </p>

                        <button
                            type="button"
                            className="create-project-btn"
                            onClick={handleCreateProject}
                        >

                            <Plus size={17} />

                            Create Your First Project

                        </button>

                    </div>

                )}


            {/* =================================
                Project Grid
            ================================= */}

            {!loading &&
                projects.length > 0 && (

                    <div className="projects-grid">

                        {projects.map((project) => (

                            <article
                                className="project-card"
                                key={project._id}
                            >

                                <div className="project-card-top">

                                    <div className="project-icon">

                                        <FolderKanban
                                            size={20}
                                        />

                                    </div>

                                    <span className="project-status">
                                        Active
                                    </span>

                                </div>


                                <div className="project-card-content">

                                    <h2>
                                        {project.title}
                                    </h2>

                                    <p>
                                        {project.description ||
                                            "No project description"}
                                    </p>

                                </div>


                                <div className="project-card-footer">

                                    <div className="project-members">

                                        <Users size={15} />

                                        <span>
                                            {project.members?.length ||
                                                0}{" "}
                                            members
                                        </span>

                                    </div>


                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="project-view-btn"
                                    >

                                        Open

                                        <ArrowRight
                                            size={15}
                                        />

                                    </Link>

                                </div>

                            </article>

                        ))}

                    </div>

                )}


            {/* =================================
                Project Modal
            ================================= */}

            <ProjectModal
                open={projectModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleProjectSuccess}
                project={editingProject}
            />

        </section>

    );

}


export default Projects;