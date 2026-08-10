import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    UserPlus,
    Users,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/tasks/TaskModal";

import "./ProjectDetails.css";

function ProjectDetails() {

    const { id } = useParams();

    const { user } = useAuth();

    // ========================================
    // State
    // ========================================

    const [project, setProject] = useState(null);

    const [members, setMembers] = useState([]);

    const [memberEmail, setMemberEmail] = useState("");

    const [addingMember, setAddingMember] = useState(false);

    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState([]);

    const [taskModalOpen, setTaskModalOpen] = useState(false);

    // ========================================
    // Fetch Project
    // ========================================

    const fetchProject = async () => {

        try {

            setLoading(true);

            const { data } = await API.get(
                `/projects/${id}`
            );

            setProject(data.project);

            setMembers(
                data.project.members || []
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load project"
            );

        } finally {

            setLoading(false);

        }

    };

    // ========================================
    // Fetch Project Tasks
    // ========================================

    const fetchTasks = async () => {

        try {

            const { data } = await API.get("/tasks");

            const projectTasks = data.tasks.filter(
                (task) => {

                    const taskProjectId =
                        task.project?._id ||
                        task.project;

                    return (
                        taskProjectId?.toString() ===
                        id?.toString()
                    );

                }
            );

            setTasks(projectTasks);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load tasks"
            );

        }

    };

    // ========================================
    // Page Load
    // ========================================

    useEffect(() => {

        if (!id) return;

        fetchProject();
        fetchTasks();

    }, [id]);

    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (
            <section className="project-details">

                <p>Loading project...</p>

            </section>
        );

    }

    // ========================================
    // Project Not Found
    // ========================================

    if (!project) {

        return (
            <section className="project-details">

                <Link
                    to="/projects"
                    className="back-btn"
                >

                    <ArrowLeft size={18} />

                    Back

                </Link>

                <h2>
                    Project not found
                </h2>

            </section>
        );

    }

    // ========================================
    // Check Project Owner
    // ========================================

    const projectOwnerId =
        project.owner?._id ||
        project.owner;

    const currentUserId =
        user?._id ||
        user?.id;

    const isProjectOwner =
        projectOwnerId?.toString() ===
        currentUserId?.toString();

    // ========================================
    // Add Member
    // OWNER ONLY
    // ========================================

    const handleAddMember = async () => {

        if (!memberEmail.trim()) {

            toast.error("Enter member email");

            return;

        }

        try {

            setAddingMember(true);

            const { data } = await API.post(
                `/projects/${id}/members`,
                {
                    email: memberEmail.trim(),
                }
            );

            toast.success(
                "Member added successfully 🎉"
            );

            setProject(data.project);

            setMembers(
                data.project.members || []
            );

            setMemberEmail("");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add member"
            );

        } finally {

            setAddingMember(false);

        }

    };

    // ========================================
    // Task Created Successfully
    // ========================================

    const handleTaskCreated = () => {

        fetchTasks();

    };

    // ========================================
    // UI
    // ========================================

    return (

        <section className="project-details">

            {/* =================================
                Project Header
            ================================= */}

            <div className="project-header">

                <div>

                    <Link
                        to="/projects"
                        className="back-btn"
                    >

                        <ArrowLeft size={18} />

                        Back

                    </Link>

                    <h1>
                        {project.title}
                    </h1>

                    <p>
                        {project.description ||
                            "No project description"}
                    </p>

                </div>

                {/* Add Task */}

                <button
                    className="add-task-btn"
                    onClick={() =>
                        setTaskModalOpen(true)
                    }
                >

                    <Plus size={18} />

                    Add Task

                </button>

            </div>

            {/* =================================
                Team Members
            ================================= */}

            <div className="project-members-card">

                <div className="members-header">

                    <div>

                        <h2>

                            <Users size={20} />

                            Team Members

                        </h2>

                        <p>
                            Project members
                            collaborating on this project.
                        </p>

                    </div>

                </div>

                {/* =================================
                    Add Member
                    OWNER ONLY
                ================================= */}

                {isProjectOwner && (

                    <div className="add-member-box">

                        <input
                            type="email"
                            placeholder="Enter registered user email"
                            value={memberEmail}
                            onChange={(e) =>
                                setMemberEmail(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={handleAddMember}
                            disabled={addingMember}
                        >

                            <UserPlus size={17} />

                            {addingMember
                                ? "Adding..."
                                : "Add Member"}

                        </button>

                    </div>

                )}

                {/* =================================
                    Members List
                ================================= */}

                {members.length > 0 ? (

                    <div className="members-list">

                        {members.map((member) => (

                            <div
                                className="project-member"
                                key={member._id}
                            >

                                <div className="member-avatar">

                                    {member.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}

                                </div>

                                <div>

                                    <h4>
                                        {member.name}
                                    </h4>

                                    <span>
                                        {member.email}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <p className="no-members">
                        No team members added yet.
                    </p>

                )}

            </div>

            {/* =================================
                Tasks / Kanban
            ================================= */}

            <KanbanBoard
                tasks={tasks}
            />

            {/* =================================
                Create Task Modal
            ================================= */}

            <TaskModal
                open={taskModalOpen}
                onClose={() =>
                    setTaskModalOpen(false)
                }
                onSuccess={handleTaskCreated}
                projectId={id}
                projects={[]}
            />

        </section>

    );

}

export default ProjectDetails;