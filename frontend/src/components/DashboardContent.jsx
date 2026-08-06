import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  FolderKanban,
  ArrowRight,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

import "./DashboardContent.css";

function DashboardContent() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const { data } = await API.get("/dashboard");

      setProjects(data.recentProjects || []);

      setTasks(data.todayTasks || []);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="dashboard-content">

      {/* Recent Projects */}

      <div className="dashboard-card">

        <div className="card-header">

          <h2>Recent Projects</h2>

          <button onClick={() => navigate("/projects")}>

            View All

            <ArrowRight size={18} />

          </button>

        </div>

        {projects.length === 0 ? (

          <p>No Projects Found</p>

        ) : (

          projects.map((project) => (

            <div
              className="project-item"
              key={project._id}
            >

              <div className="project-icon">

                <FolderKanban size={20} />

              </div>

              <div>

                <h3>{project.title}</h3>

                <span>

                  {new Date(project.updatedAt).toLocaleDateString("en-IN")}

                </span>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Today's Tasks */}

      <div className="dashboard-card">

        <div className="card-header">

          <h2>Today's Tasks</h2>

        </div>

        {tasks.length === 0 ? (

          <p>No Tasks Found</p>

        ) : (

          tasks.map((task) => (

            <div
              className="task-item"
              key={task._id}
            >

              <div className="task-left">

                <CircleCheckBig size={18} />

                <span>{task.title}</span>

              </div>

              <div className="task-status">

                <Clock3 size={16} />

                <small>{task.status}</small>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );

}

export default DashboardContent;