import {
  UserRound,
  CircleCheckBig,
  Clock3,
  MessageSquare,
} from "lucide-react";

import "./DashboardExtras.css";

function DashboardExtras() {

  const activities = [

    {
      icon: <CircleCheckBig size={18} />,
      text: "Login UI completed",
      time: "10 min ago",
    },

    {
      icon: <MessageSquare size={18} />,
      text: "New comment added",
      time: "30 min ago",
    },

    {
      icon: <Clock3 size={18} />,
      text: "Project deadline updated",
      time: "1 hour ago",
    },

  ];

  const members = [
    "Pranav",
    "Rahul",
    "Sakshi",
    "Aman",
  ];

  return (

    <section className="dashboard-extras">

      {/* Activity */}

      <div className="dashboard-card">

        <h2>Recent Activity</h2>

        {activities.map((item,index)=>(

          <div
            className="activity-item"
            key={index}
          >

            <div className="activity-icon">
              {item.icon}
            </div>

            <div>

              <h4>{item.text}</h4>

              <small>{item.time}</small>

            </div>

          </div>

        ))}

      </div>

      {/* Team */}

      <div className="dashboard-card">

        <h2>Team Members</h2>

        {members.map((member,index)=>(

          <div
            className="member-item"
            key={index}
          >

            <div className="member-left">

              <div className="avatar">

                <UserRound size={18}/>

              </div>

              <span>{member}</span>

            </div>

            <span className="online-dot"></span>

          </div>

        ))}

      </div>

    </section>

  );

}

export default DashboardExtras;