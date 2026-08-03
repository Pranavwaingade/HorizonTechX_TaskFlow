import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import KanbanBoard from "../components/KanbanBoard";

import "./ProjectDetails.css";

function ProjectDetails() {

  const tasks = [

    {
      id:1,
      title:"Design Login Page",
      description:"Create responsive login UI.",
      priority:"High",
      assigned:"Pranav",
      deadline:"5 Aug",
      status:"todo",
    },

    {
      id:2,
      title:"Connect Backend API",
      description:"Authentication APIs.",
      priority:"Medium",
      assigned:"Rahul",
      deadline:"6 Aug",
      status:"progress",
    },

    {
      id:3,
      title:"Responsive Navbar",
      description:"Complete mobile layout.",
      priority:"Low",
      assigned:"Amit",
      deadline:"2 Aug",
      status:"done",
    },

  ];

  return (

    <section className="project-details">

      <div className="project-header">

        <div>

          <Link
            to="/projects"
            className="back-btn"
          >

            <ArrowLeft size={18}/>

            Back

          </Link>

          <h1>Website Redesign</h1>

          <p>

            Modern company website redesign project.

          </p>

        </div>

        <button className="add-task-btn">

          <Plus size={18}/>

          Add Task

        </button>

      </div>

      <KanbanBoard tasks={tasks}/>

    </section>

  );

}

export default ProjectDetails;