import {
  CalendarDays,
  User,
  Flag,
} from "lucide-react";

import "./TaskCard.css";

function TaskCard({ task }) {

  return (

    <div className="task-card">

      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <div className="task-meta">

        <span className={`priority ${task.priority.toLowerCase()}`}>

          <Flag size={15} />

          {task.priority}

        </span>

        <span>

          <User size={15} />

          {task.assigned}

        </span>

      </div>

      <div className="task-footer">

        <CalendarDays size={15} />

        {task.deadline}

      </div>

    </div>

  );

}

export default TaskCard;