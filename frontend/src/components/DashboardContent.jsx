import {
  FolderKanban,
  ArrowRight,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

import "./DashboardContent.css";

function DashboardContent() {

  const projects = [
    "Website Redesign",
    "CRM Dashboard",
    "TaskFlow Mobile App",
  ];

  const tasks = [
    {
      title: "Design Login Page",
      status: "Completed",
    },
    {
      title: "Connect Backend API",
      status: "In Progress",
    },
    {
      title: "Create Project Module",
      status: "Pending",
    },
  ];

  return (

    <section className="dashboard-content">

      {/* Recent Projects */}

      <div className="dashboard-card">

        <div className="card-header">

          <h2>Recent Projects</h2>

          <button>

            View All

            <ArrowRight size={18}/>

          </button>

        </div>

        {projects.map((project,index)=>(

          <div
            className="project-item"
            key={index}
          >

            <div className="project-icon">

              <FolderKanban size={20}/>

            </div>

            <div>

              <h3>{project}</h3>

              <span>Updated Today</span>

            </div>

          </div>

        ))}

      </div>

      {/* Today's Tasks */}

      <div className="dashboard-card">

        <div className="card-header">

          <h2>Today's Tasks</h2>

        </div>

        {tasks.map((task,index)=>(

          <div
            className="task-item"
            key={index}
          >

            <div className="task-left">

              <CircleCheckBig size={18}/>

              <span>{task.title}</span>

            </div>

            <div className="task-status">

              <Clock3 size={16}/>

              <small>{task.status}</small>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default DashboardContent;