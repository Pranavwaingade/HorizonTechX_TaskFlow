import StatsCards from "../components/dashboard/StatsCards";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardExtras from "../components/dashboard/DashboardExtras";

import "./Dashboard.css";


function Dashboard() {

    return (

        <div className="dashboard-page">

            {/* Welcome */}

            <section className="dashboard-welcome">

                <div>

                    <p>
                        Welcome back 👋
                    </p>

                    <h2>
                        Let's get things done.
                    </h2>

                </div>

            </section>


            {/* Stats */}

            <StatsCards />


            {/* Recent Projects + Tasks */}

            <DashboardContent />


            {/* Activity + Team */}

            <DashboardExtras />

        </div>

    );

}


export default Dashboard;