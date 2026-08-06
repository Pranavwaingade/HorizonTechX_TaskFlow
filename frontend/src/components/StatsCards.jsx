import { useEffect, useState } from "react";
import API from "../services/api";

import {
    FolderKanban,
    CheckSquare,
    Users,
    CircleCheckBig,
} from "lucide-react";

import "./StatsCards.css";
function StatsCards() {
    const [stats, setStats] = useState({

        totalProjects: 0,

        totalTasks: 0,

        completedTasks: 0,

        pendingTasks: 0,

        highPriorityTasks: 0,

    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const { data } = await API.get("/dashboard");

            setStats(data.stats);

        }

        catch (error) {

            console.log(error);

        }

    };
    // const stats = [

    //     {
    //         title: "Projects",
    //         value: "12",
    //         icon: <FolderKanban size={32} />,
    //     },

    //     {
    //         title: "Tasks",
    //         value: "48",
    //         icon: <CheckSquare size={32} />,
    //     },

    //     {
    //         title: "Team Members",
    //         value: "18",
    //         icon: <Users size={32} />,
    //     },

    //     {
    //         title: "Completed",
    //         value: "92%",
    //         icon: <CircleCheckBig size={32} />,
    //     },

    // ];

    const cards = [

        {
            title: "Projects",
            value: stats.totalProjects,
            icon: <FolderKanban size={32} />,
        },

        {
            title: "Tasks",
            value: stats.totalTasks,
            icon: <CheckSquare size={32} />,
        },

        {
            title: "High Priority",
            value: stats.highPriorityTasks,
            icon: <Users size={32} />,
        },

        {
            title: "Completed",
            value: stats.completedTasks,
            icon: <CircleCheckBig size={32} />,
        },

    ];
    return (

        <section className="stats-grid">

            {cards.map((item, index) => (

                <div
                    className="stats-card"
                    key={index}
                >

                    <div className="stats-icon">
                        {item.icon}
                    </div>

                    <div>

                        <h2>{item.value}</h2>

                        <p>{item.title}</p>

                    </div>

                </div>

            ))}

        </section>

    );

}

export default StatsCards;