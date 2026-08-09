import { useState } from "react";
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

import "./ProjectDetails.css";


function ProjectDetails() {

    const { id } = useParams();

    const { user } = useAuth();


    const [memberEmail, setMemberEmail] = useState("");

    const [members, setMembers] = useState([]);

    const [addingMember, setAddingMember] = useState(false);


    /*
    ==========================================
    Temporary Tasks
    ==========================================
    */

    const tasks = [

        {
            id: 1,
            title: "Design Login Page",
            description: "Create responsive login UI.",
            priority: "High",
            assigned: "Pranav",
            deadline: "5 Aug",
            status: "todo",
        },

        {
            id: 2,
            title: "Connect Backend API",
            description: "Authentication APIs.",
            priority: "Medium",
            assigned: "Rahul",
            deadline: "6 Aug",
            status: "progress",
        },

        {
            id: 3,
            title: "Responsive Navbar",
            description: "Complete mobile layout.",
            priority: "Low",
            assigned: "Amit",
            deadline: "2 Aug",
            status: "done",
        },

    ];


    /*
    ==========================================
    Add Team Member
    ==========================================
    */

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


            setMembers(
                data.project.members || []
            );


            setMemberEmail("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to add member"

            );

        }

        finally {

            setAddingMember(false);

        }

    };


    /*
    ==========================================
    UI
    ==========================================
    */

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
                        Website Redesign
                    </h1>


                    <p>
                        Modern company website
                        redesign project.
                    </p>

                </div>


                <button className="add-task-btn">

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

                            Add registered users
                            to collaborate on this project.

                        </p>

                    </div>

                </div>



                {/* =================================
                    Add Member
                    ONLY PROJECT OWNER
                ================================= */}

                {/*
                    IMPORTANT:

                    Add Member section will only
                    appear for the project owner.

                    Normal project members will NOT
                    see this section.
                */}

                {/*
                    We will use projectOwnerId here
                    once project data is fetched.
                */}

                {user && (

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

                                : "Add Member"

                            }

                        </button>

                    </div>

                )}



                {/* =================================
                    Members List
                ================================= */}

                {members.length > 0 && (

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

                )}


            </div>



            {/* =================================
                Tasks
            ================================= */}

            <KanbanBoard
                tasks={tasks}
            />


        </section>

    );

}


export default ProjectDetails;