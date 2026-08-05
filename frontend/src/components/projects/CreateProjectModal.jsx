import { useState, useEffect } from "react";
import { X } from "lucide-react";
import API from "../../services/api";
import toast from "react-hot-toast";
import "./CreateProjectModal.css";

function CreateProjectModal({ open, onClose, onProjectCreated, project, }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    useEffect(() => {

        if (project) {

            setFormData({
                title: project.title || "",
                description: project.description || "",
                dueDate: project.dueDate
                    ? project.dueDate.substring(0, 10)
                    : "",
            });

        } else {

            setFormData({
                title: "",
                description: "",
                dueDate: "",
            });

        }

    }, [project]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {
            return toast.error("Project title is required");
        }

        try {

            setLoading(true);
            if (project) {

                await API.put(`/projects/${project._id}`, formData);

                toast.success("Project Updated Successfully 🎉");

            } else {

                await API.post("/projects", formData);

                toast.success("Project Created Successfully 🎉");

            }
            setFormData({
                title: "",
                description: "",
                dueDate: "",
            });

            onProjectCreated();

            // Grid refresh next step madhe karu

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>
                        {project ? "Edit Project" : "Create Project"}
                    </h2>

                    <button onClick={onClose}>
                        <X size={22} />
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Project Description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="create-project-btn"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateProjectModal;