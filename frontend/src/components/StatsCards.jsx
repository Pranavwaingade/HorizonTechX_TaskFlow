import {
    FolderKanban,
    CheckSquare,
    Users,
    CircleCheckBig,
} from "lucide-react";

import "./StatsCards.css";

function StatsCards() {

    const stats = [

        {
            title: "Projects",
            value: "12",
            icon: <FolderKanban size={32} />,
        },

        {
            title: "Tasks",
            value: "48",
            icon: <CheckSquare size={32} />,
        },

        {
            title: "Team Members",
            value: "18",
            icon: <Users size={32} />,
        },

        {
            title: "Completed",
            value: "92%",
            icon: <CircleCheckBig size={32} />,
        },

    ];

    return (

        <section className="stats-grid">

            {stats.map((item, index) => (

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