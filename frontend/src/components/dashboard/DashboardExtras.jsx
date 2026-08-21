import { useEffect, useState } from "react";

import {
    UserRound,
    CircleCheckBig,
    Clock3,
    FolderKanban,
} from "lucide-react";

import API from "../../services/api";

import "./DashboardExtras.css";


function DashboardExtras() {

    const [activities, setActivities] = useState([]);

    const [members, setMembers] = useState([]);

    const [loadingActivity, setLoadingActivity] =
        useState(true);

    const [loadingMembers, setLoadingMembers] =
        useState(true);


    // Fetch Recent Activity

    useEffect(() => {

        const fetchActivity = async () => {

            try {

                const { data } =
                    await API.get("/dashboard");

                setActivities(
                    data.recentActivity || []
                );

            } catch (error) {

                console.log(
                    "Activity error:",
                    error
                );

            } finally {

                setLoadingActivity(false);

            }

        };


        fetchActivity();

    }, []);


    // Fetch Team Members From Projects

    useEffect(() => {

        const fetchMembers = async () => {

            try {

                const { data } =
                    await API.get("/projects");


                const projects =
                    data.projects || [];


                // Unique members map

                const membersMap = new Map();


                projects.forEach((project) => {


                    // Project Owner

                    if (project.owner?._id) {

                        membersMap.set(
                            project.owner._id,
                            project.owner
                        );

                    }


                    // Project Members

                    project.members?.forEach(
                        (member) => {

                            if (member?._id) {

                                membersMap.set(
                                    member._id,
                                    member
                                );

                            }

                        }
                    );

                });


                setMembers(
                    Array.from(
                        membersMap.values()
                    )
                );

            } catch (error) {

                console.log(
                    "Team members error:",
                    error
                );

            } finally {

                setLoadingMembers(false);

            }

        };


        fetchMembers();

    }, []);


    // Activity Icon

    const getActivityIcon = (status) => {

        if (status === "Completed") {

            return (
                <CircleCheckBig size={17} />
            );

        }

        if (status === "In Progress") {

            return (
                <Clock3 size={17} />
            );

        }

        return (
            <FolderKanban size={17} />
        );

    };


    // Activity Status Class

    const getActivityClass = (status) => {

        if (status === "Completed") {

            return "completed";

        }

        if (status === "In Progress") {

            return "progress";

        }

        return "pending";

    };


    // Format Time

    const formatTime = (date) => {

        if (!date) {

            return "Recently";

        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };


    // UI

    return (

        <section className="dashboard-extras">


                {/* Recent Activity */}

            <div className="dashboard-extra-card">

                <div className="extra-card-header">

                    <div>

                        <h2>

                            <Clock3 size={19} />

                            Recent Activity

                        </h2>

                        <p>
                            Latest task updates
                        </p>

                    </div>

                </div>


                {loadingActivity ? (

                    <div className="extra-empty">

                        Loading activity...

                    </div>

                ) : activities.length === 0 ? (

                    <div className="extra-empty">

                        <Clock3 size={28} />

                        <p>
                            No recent activity
                        </p>

                        <span>
                            Task updates will appear here.
                        </span>

                    </div>

                ) : (

                    <div className="activity-list">

                        {activities.map(
                            (activity) => (

                                <div
                                    className="activity-item"
                                    key={activity._id}
                                >

                                    <div
                                        className={`activity-icon ${getActivityClass(
                                            activity.status
                                        )}`}
                                    >

                                        {getActivityIcon(
                                            activity.status
                                        )}

                                    </div>


                                    <div className="activity-info">

                                        <h4>
                                            {activity.title}
                                        </h4>

                                        <p>
                                            {activity.project?.title ||
                                                "Project"}
                                        </p>

                                        <small>
                                            {formatTime(
                                                activity.updatedAt
                                            )}
                                        </small>

                                    </div>


                                    <span
                                        className={`activity-status ${getActivityClass(
                                            activity.status
                                        )}`}
                                    >

                                        {activity.status}

                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


                {/* Team Members */}

            <div className="dashboard-extra-card">

                <div className="extra-card-header">

                    <div>

                        <h2>

                            <UserRound size={19} />

                            Team Members

                        </h2>

                        <p>
                            People working with you
                        </p>

                    </div>

                </div>


                {loadingMembers ? (

                    <div className="extra-empty">

                        Loading team...

                    </div>

                ) : members.length === 0 ? (

                    <div className="extra-empty">

                        <UserRound size={28} />

                        <p>
                            No team members
                        </p>

                        <span>
                            Add members to collaborate.
                        </span>

                    </div>

                ) : (

                    <div className="member-list">

                        {members
                            .slice(0, 5)
                            .map((member) => (

                                <div
                                    className="dashboard-member-item"
                                    key={member._id}
                                >


                                    {/* Avatar */}

                                    <div className="member-avatar">

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


                                    {/* Info */}

                                    <div className="member-info">

                                        <h4>
                                            {member.name ||
                                                "Unknown User"}
                                        </h4>

                                        <p>
                                            {member.email ||
                                                "Member"}
                                        </p>

                                    </div>


                                    <span
                                        className="online-dot"
                                    />

                                </div>

                            ))}

                    </div>

                )}

            </div>


        </section>

    );

}


export default DashboardExtras;