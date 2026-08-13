import { useEffect, useState } from "react";

import {
    FolderKanban,
    CheckSquare,
    CircleCheckBig,
    Clock3,
} from "lucide-react";

import API from "../../services/api";

import "./StatsCards.css";


function StatsCards() {

    const [stats, setStats] = useState({

        totalProjects: 0,

        totalTasks: 0,

        completedTasks: 0,

        pendingTasks: 0,

    });


    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const fetchStats = async () => {

            try {

                const { data } =
                    await API.get("/dashboard");

                setStats(
                    data.stats || {}
                );

            }

            catch (error) {

                console.log(
                    "Failed to load dashboard stats:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


        fetchStats();

    }, []);


    const cards = [

        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: FolderKanban,
            className: "purple",
        },

        {
            title: "Total Tasks",
            value: stats.totalTasks,
            icon: CheckSquare,
            className: "blue",
        },

        {
            title: "Completed",
            value: stats.completedTasks,
            icon: CircleCheckBig,
            className: "green",
        },

        {
            title: "Pending",
            value: stats.pendingTasks,
            icon: Clock3,
            className: "orange",
        },

    ];


    return (

        <section className="stats-grid">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        className="stat-card"
                        key={card.title}
                    >

                        <div className="stat-card-top">

                            <div>

                                <p>
                                    {card.title}
                                </p>

                                <h2>

                                    {loading
                                        ? "..."
                                        : card.value
                                    }

                                </h2>

                            </div>


                            <div
                                className={`stat-icon ${card.className}`}
                            >

                                <Icon size={21} />

                            </div>

                        </div>

                    </div>

                );

            })}

        </section>

    );

}


export default StatsCards;