import {
  Bell,
  Search
} from "lucide-react";

import "./DashboardHeader.css";

function DashboardHeader() {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <header className="dashboard-header">

      <div>

        <h1>
          Welcome Back 👋
        </h1>

        <p>{today}</p>

      </div>

      <div className="header-right">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search projects..."
          />

        </div>

        <button className="notification-btn">

          <Bell size={20} />

          <span></span>

        </button>

        <div className="profile-box">

          <img
            src="https://ui-avatars.com/api/?name=Pranav&background=6D8196&color=fff"
            alt="profile"
          />

        </div>

      </div>

    </header>

  );

}

export default DashboardHeader;