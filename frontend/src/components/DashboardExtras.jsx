import { useEffect, useState } from "react";

import {
    UserRound,
    CircleCheckBig,
    Clock3,
    FolderKanban,
} from "lucide-react";

import API from "../services/api";

import "./DashboardExtras.css";

function DashboardExtras() {

    const [activities, setActivities] = useState([]);

    const [members, setMembers] = useState([]);


    // ========================================
    // Fetch Dashboard Activity + Team
    // ========================================

    useEffect(() => {

        fetchDashboard();

        fetchTeamMembers();

    }, []);


    const fetchDashboard = async () => {

        try {

            const { data } = await API.get("/dashboard");

            setActivities(data.recentActivity || []);

        }

        catch (error) {

            console.log(error);

        }

    };


    // ========================================
    // Fetch Team Members
    // ========================================

    const fetchTeamMembers = async () => {

        try {

            const { data } = await API.get("/team");

            setMembers(data.members || []);

        }

        catch (error) {

            console.log(error);

        }

    };


    // ========================================
    // Activity Icon
    // ========================================

    const getActivityIcon = (status) => {

        if (status === "Completed") {

            return <CircleCheckBig size={18} />;

        }

        if (status === "In Progress") {

            return <Clock3 size={18} />;

        }

        return <FolderKanban size={18} />;

    };


    // ========================================
    // Format Time
    // ========================================

    const formatTime = (date) => {

        if (!date) return "Recently";

        return new Date(date).toLocaleString("en-IN", {

            day: "2-digit",

            month: "short",

            hour: "2-digit",

            minute: "2-digit",

        });

    };


    return (

        <section className="dashboard-extras">


            {/* ========================= */}
            {/* Recent Activity */}
            {/* ========================= */}

            <div className="dashboard-card">

                <h2>Recent Activity</h2>


                {activities.length === 0 ? (

                    <p>No Recent Activity</p>

                ) : (

                    activities.map((item) => (

                        <div
                            className="activity-item"
                            key={item._id}
                        >

                            <div className="activity-icon">

                                {getActivityIcon(item.status)}

                            </div>


                            <div>

                                <h4>

                                    {item.title}

                                </h4>


                                <small>

                                    {item.status} •{" "}

                                    {formatTime(item.updatedAt)}

                                </small>

                            </div>

                        </div>

                    ))

                )}

            </div>


            {/* ========================= */}
            {/* Team Members */}
            {/* ========================= */}

            <div className="dashboard-card">

                <h2>Team Members</h2>


                {members.length === 0 ? (

                    <p>No Team Members</p>

                ) : (

                    members.map((member) => (

                        <div
                            className="member-item"
                            key={member._id}
                        >

                            <div className="member-left">

                                <div className="avatar">

                                    <UserRound size={18} />

                                </div>


                                <div>

                                    <span>
                                        {member.name}
                                    </span>

                                    <small
                                        style={{
                                            display: "block",
                                            color: "var(--text-light)",
                                            fontSize: "11px",
                                            marginTop: "2px",
                                        }}
                                    >
                                        {member.role}
                                    </small>

                                </div>

                            </div>


                            <span className="online-dot"></span>

                        </div>

                    ))

                )}

            </div>


        </section>

    );

}

export default DashboardExtras;