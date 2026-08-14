import { useEffect, useState } from "react";
import {
    Users,
    UserPlus,
    UserMinus,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./Teams.css";


function Teams() {

    const { user } = useAuth();


    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [addingProjectId, setAddingProjectId] =
        useState(null);

    const [memberEmail, setMemberEmail] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);


    // ========================================
    // Check Project Owner
    // ========================================

    const isProjectOwner = (project) => {

        const projectOwnerId =
            project.owner?._id ||
            project.owner;

        const currentUserId =
            user?._id ||
            user?.id;

        if (!projectOwnerId || !currentUserId) {
            return false;
        }

        return (
            projectOwnerId.toString() ===
            currentUserId.toString()
        );

    };


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
    // OWNER ONLY
    // ========================================

    const handleOpenAddMember = (project) => {

        if (!isProjectOwner(project)) {

            toast.error(
                "Only project owner can add members"
            );

            return;

        }

        setAddingProjectId(
            project._id
        );

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
    // OWNER ONLY
    // ========================================

    const handleAddMember = async (project) => {

        if (!isProjectOwner(project)) {

            toast.error(
                "Only project owner can add members"
            );

            return;

        }


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

                    `/projects/${project._id}/members`,

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
    // Remove Member
    // OWNER ONLY
    // ========================================

    const handleRemoveMember = async (
        project,
        member
    ) => {

        if (!isProjectOwner(project)) {

            toast.error(
                "Only project owner can remove members"
            );

            return;

        }


        const confirmed =
            window.confirm(
                `Remove ${
                    member.name ||
                    "this member"
                } from the project?`
            );


        if (!confirmed) return;


        try {

            setSubmitting(true);


            const { data } =
                await API.delete(

                    `/projects/${project._id}/members/${member._id}`

                );


            toast.success(
                data.message ||
                "Member removed successfully"
            );


            await fetchProjects();

        } catch (error) {

            console.log(
                "Remove member error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to remove member"
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

                        View the people working
                        across your projects.

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

                <div className="teams-projects">

                    {projects.map((project) => (

                        <article
                            className="team-project-card"
                            key={project._id}
                        >


                            {/* =================================
                                Project Header
                            ================================= */}

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


                            {/* =================================
                                Members
                            ================================= */}

                            <div className="project-members">


                                {/* =================================
                                    Owner
                                ================================= */}

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


                                {/* =================================
                                    Project Members
                                ================================= */}

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


                                            {/* =================================
                                                Remove Member
                                                OWNER ONLY
                                            ================================= */}

                                            {isProjectOwner(
                                                project
                                            ) && (

                                                <button
                                                    type="button"
                                                    className="remove-member-btn"
                                                    onClick={() =>
                                                        handleRemoveMember(
                                                            project,
                                                            member
                                                        )
                                                    }
                                                    disabled={
                                                        submitting
                                                    }
                                                    title="Remove member"
                                                >

                                                    <UserMinus
                                                        size={16}
                                                    />

                                                </button>

                                            )}

                                        </div>

                                    )
                                )}


                                {/* =================================
                                    No Members
                                ================================= */}

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
                                OWNER ONLY
                            ================================= */}

                            {isProjectOwner(project) && (

                                <div className="add-member-section">

                                    {addingProjectId ===
                                        project._id ? (

                                        <div className="add-member-form">


                                            {/* Input */}

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
                                                                project
                                                            );

                                                        }

                                                    }}
                                                />

                                            </div>


                                            {/* Add */}

                                            <button
                                                type="button"
                                                className="add-member-submit"
                                                onClick={() =>
                                                    handleAddMember(
                                                        project
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


                                            {/* Cancel */}

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
                                                    project
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

                            )}

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}


export default Teams;