import { useEffect, useState } from "react";
import {
    Users,
    UserPlus,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";

import "./Teams.css";


function Teams() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [addingProjectId, setAddingProjectId] =
        useState(null);

    const [memberEmail, setMemberEmail] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);


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
                "Teams error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load team members"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // Load
    // ========================================

    useEffect(() => {

        fetchProjects();

    }, []);


    // ========================================
    // Open Add Member
    // ========================================

    const handleOpenAddMember = (
        projectId
    ) => {

        setAddingProjectId(projectId);

        setMemberEmail("");

    };


    // ========================================
    // Close Add Member
    // ========================================

    const handleCloseAddMember = () => {

        if (submitting) return;

        setAddingProjectId(null);

        setMemberEmail("");

    };


    // ========================================
    // Add Member
    // ========================================

    const handleAddMember = async (
        projectId
    ) => {

        if (!memberEmail.trim()) {

            toast.error(
                "Member email is required"
            );

            return;

        }


        try {

            setSubmitting(true);


            const { data } =
                await API.post(
                    `/projects/${projectId}/members`,
                    {
                        email:
                            memberEmail
                                .trim()
                                .toLowerCase(),
                    }
                );


            toast.success(
                data.message ||
                "Member added successfully 🎉"
            );


            setAddingProjectId(null);

            setMemberEmail("");


            // Refresh projects

            await fetchProjects();

        } catch (error) {

            console.log(
                "Add member error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to add member"
            );

        } finally {

            setSubmitting(false);

        }

    };


    // ========================================
    // UI
    // ========================================

    return (

        <section className="teams-page">


            {/* =================================
                Header
            ================================= */}

            <div className="teams-header">

                <div>

                    <p className="page-label">
                        Workspace
                    </p>

                    <h1>
                        Teams
                    </h1>

                    <p className="page-description">
                        View the people working across
                        your projects.
                    </p>

                </div>

            </div>


            {/* =================================
                Loading
            ================================= */}

            {loading ? (

                <div className="teams-state">

                    <Users size={30} />

                    <p>
                        Loading team members...
                    </p>

                </div>


            ) : projects.length === 0 ? (

                /* =================================
                    No Projects
                ================================= */

                <div className="teams-state">

                    <Users size={32} />

                    <h2>
                        No projects yet
                    </h2>

                    <p>
                        Create a project and add
                        members to build your team.
                    </p>

                </div>


            ) : (

                /* =================================
                    Projects
                ================================= */

                <div className="teams-projects">

                    {projects.map((project) => (

                        <article
                            className="team-project-card"
                            key={project._id}
                        >


                            {/* Project Header */}

                            <div className="team-project-header">

                                <div>

                                    <h2>
                                        {project.title}
                                    </h2>

                                    {project.description && (

                                        <p>
                                            {
                                                project.description
                                            }
                                        </p>

                                    )}

                                </div>


                                <div className="team-project-count">

                                    <Users size={16} />

                                    {
                                        (project.members?.length || 0) +
                                        (project.owner ? 1 : 0)
                                    }

                                </div>

                            </div>


                            {/* Members */}

                            <div className="project-members">

                                {/* Owner */}

                                {project.owner && (

                                    <div className="team-member">

                                        <div className="team-avatar">

                                            {project.owner.avatar ? (

                                                <img
                                                    src={
                                                        project.owner.avatar
                                                    }
                                                    alt={
                                                        project.owner.name ||
                                                        "User"
                                                    }
                                                />

                                            ) : (

                                                (
                                                    project.owner.name ||
                                                    "U"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()

                                            )}

                                        </div>


                                        <div className="team-info">

                                            <h3>
                                                {
                                                    project.owner.name ||
                                                    "Unknown User"
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    project.owner.email ||
                                                    "No email"
                                                }
                                            </p>

                                        </div>


                                        <span className="owner-badge">
                                            Owner
                                        </span>

                                    </div>

                                )}


                                {/* Members */}

                                {project.members?.map(
                                    (member) => (

                                        <div
                                            className="team-member"
                                            key={member._id}
                                        >

                                            <div className="team-avatar">

                                                {member.avatar ? (

                                                    <img
                                                        src={
                                                            member.avatar
                                                        }
                                                        alt={
                                                            member.name ||
                                                            "User"
                                                        }
                                                    />

                                                ) : (

                                                    (
                                                        member.name ||
                                                        "U"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()

                                                )}

                                            </div>


                                            <div className="team-info">

                                                <h3>
                                                    {
                                                        member.name ||
                                                        "Unknown User"
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        member.email ||
                                                        "No email"
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )}


                                {/* No Members */}

                                {(!project.members ||
                                    project.members.length === 0) && (

                                    <div className="no-members">

                                        <Users size={18} />

                                        <span>
                                            No members added yet.
                                        </span>

                                    </div>

                                )}

                            </div>


                            {/* =================================
                                Add Member
                            ================================= */}

                            <div className="add-member-section">


                                {addingProjectId ===
                                    project._id ? (

                                    <div className="add-member-form">

                                        <div className="add-member-input-wrap">

                                            <UserPlus
                                                size={17}
                                            />

                                            <input
                                                type="email"
                                                placeholder="Enter member email"
                                                value={
                                                    memberEmail
                                                }
                                                onChange={(e) =>
                                                    setMemberEmail(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    submitting
                                                }
                                                onKeyDown={(e) => {

                                                    if (
                                                        e.key ===
                                                        "Enter"
                                                    ) {

                                                        e.preventDefault();

                                                        handleAddMember(
                                                            project._id
                                                        );

                                                    }

                                                }}
                                            />

                                        </div>


                                        <button
                                            type="button"
                                            className="add-member-submit"
                                            onClick={() =>
                                                handleAddMember(
                                                    project._id
                                                )
                                            }
                                            disabled={
                                                submitting
                                            }
                                        >

                                            {submitting
                                                ? "Adding..."
                                                : "Add Member"}

                                        </button>


                                        <button
                                            type="button"
                                            className="add-member-cancel"
                                            onClick={
                                                handleCloseAddMember
                                            }
                                            disabled={
                                                submitting
                                            }
                                            title="Cancel"
                                        >

                                            <X size={17} />

                                        </button>

                                    </div>

                                ) : (

                                    <button
                                        type="button"
                                        className="add-member-btn"
                                        onClick={() =>
                                            handleOpenAddMember(
                                                project._id
                                            )
                                        }
                                    >

                                        <UserPlus
                                            size={17}
                                        />

                                        Add Member

                                    </button>

                                )}

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}


export default Teams;