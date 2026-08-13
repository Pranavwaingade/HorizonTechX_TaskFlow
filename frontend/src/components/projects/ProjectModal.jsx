import { useEffect, useState } from "react";
import { X, FolderKanban } from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";

import "./ProjectModal.css";


function ProjectModal({
    open,
    onClose,
    onSuccess,
    project = null,
}) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [saving, setSaving] = useState(false);


    // ========================================
    // Load Project For Edit
    // ========================================

    useEffect(() => {

        if (project) {

            setFormData({
                title: project.title || "",
                description: project.description || "",
            });

        } else {

            setFormData({
                title: "",
                description: "",
            });

        }

    }, [project, open]);


    // ========================================
    // Input Change
    // ========================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // ========================================
    // Submit
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {

            toast.error("Project title is required");

            return;

        }


        try {

            setSaving(true);


            if (project) {

                await API.put(
                    `/projects/${project._id}`,
                    {
                        title: formData.title.trim(),
                        description:
                            formData.description.trim(),
                    }
                );

                toast.success(
                    "Project updated successfully ✅"
                );

            } else {

                await API.post(
                    "/projects",
                    {
                        title: formData.title.trim(),
                        description:
                            formData.description.trim(),
                    }
                );

                toast.success(
                    "Project created successfully 🎉"
                );

            }


            onSuccess?.();

            onClose?.();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save project"
            );

        } finally {

            setSaving(false);

        }

    };


    if (!open) return null;


    return (

        <div
            className="project-modal-overlay"
            onMouseDown={onClose}
        >

            <div
                className="project-modal"
                onMouseDown={(e) =>
                    e.stopPropagation()
                }
            >

                {/* Header */}

                <div className="project-modal-header">

                    <div className="project-modal-title">

                        <div className="project-modal-icon">

                            <FolderKanban size={20} />

                        </div>

                        <div>

                            <h2>
                                {project
                                    ? "Edit Project"
                                    : "Create Project"}
                            </h2>

                            <p>
                                {project
                                    ? "Update your project details."
                                    : "Create a new workspace project."}
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="project-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* Form */}

                <form
                    className="project-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="project-title">
                            Project Title
                        </label>

                        <input
                            id="project-title"
                            type="text"
                            name="title"
                            placeholder="e.g. TaskFlow Website"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={100}
                            autoFocus
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="project-description">
                            Description
                        </label>

                        <textarea
                            id="project-description"
                            name="description"
                            placeholder="What is this project about?"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            maxLength={500}
                        />

                        <span className="form-hint">
                            {formData.description.length}/500
                        </span>

                    </div>


                    {/* Buttons */}

                    <div className="project-modal-actions">

                        <button
                            type="button"
                            className="project-cancel-btn"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="project-submit-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : project
                                    ? "Update Project"
                                    : "Create Project"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default ProjectModal;