import { useState } from "react";
import { X } from "lucide-react";
import "./CreateProjectModal.css";

function CreateProjectModal({
  open,
  onClose,
  onCreate,
}) {

  const [form, setForm] = useState({

    title: "",

    description: "",

    status: "Planning",

    priority: "Medium",

    deadline: "",

    members: "",

  });

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onCreate({

      ...form,

      progress: 0,

      tasks: 0,

      members: Number(form.members),

    });

    onClose();

    setForm({

      title: "",

      description: "",

      status: "Planning",

      priority: "Medium",

      deadline: "",

      members: "",

    });

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>Create Project</h2>

          <button onClick={onClose}>

            <X size={20} />

          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Project Name"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option>Planning</option>

            <option>In Progress</option>

            <option>Completed</option>

          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >

            <option>Low</option>

            <option>Medium</option>

            <option>High</option>

          </select>

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="members"
            placeholder="Team Members"
            value={form.members}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
            >
              Create Project
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default CreateProjectModal;