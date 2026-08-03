import DashboardContent from "../components/DashboardContent";
import DashboardExtras from "../components/DashboardExtras";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import "./Dashboard.css";

function Dashboard() {

  return (

    <section className="dashboard">
      <DashboardHeader />
      <StatsCards/>
      <DashboardContent/>
      <DashboardExtras/>

    </section>

  );

}

export default Dashboard;