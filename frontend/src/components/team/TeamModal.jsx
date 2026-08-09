import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";

import "./TeamModal.css";

function TeamModal({
    open,
    onClose,
    member,
    onSuccess,
}) {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [role, setRole] = useState("Member");

    const [loading, setLoading] = useState(false);


    // ========================================
    // Load Member For Edit
    // ========================================

    useEffect(() => {

        if (member) {

            setName(member.name || "");

            setEmail(member.email || "");

            setRole(member.role || "Member");

        }

        else {

            setName("");

            setEmail("");

            setRole("Member");

        }

    }, [member, open]);


    if (!open) return null;


    // ========================================
    // Submit
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!name.trim() || !email.trim()) {

            toast.error(
                "Name and Email are required"
            );

            return;

        }


        try {

            setLoading(true);


            if (member) {

                // Edit

                await API.put(
                    `/team/${member._id}`,
                    {
                        name: name.trim(),
                        email: email.trim(),
                        role,
                    }
                );

                toast.success(
                    "Team member updated ✏️"
                );

            }

            else {

                // Add

                await API.post(
                    "/team",
                    {
                        name: name.trim(),
                        email: email.trim(),
                        role,
                    }
                );

                toast.success(
                    "Team member added 👥"
                );

            }


            onSuccess();

            onClose();

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="team-modal-overlay"
            onClick={onClose}
        >

            <div
                className="team-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* Header */}

                <div className="team-modal-header">

                    <h2>

                        {member
                            ? "Edit Team Member"
                            : "Add Team Member"}

                    </h2>


                    <button
                        className="team-modal-close"
                        onClick={onClose}
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="team-form"
                >

                    {/* Name */}

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter member name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    {/* Role */}

                    <div className="form-group">

                        <label>
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >

                            <option value="Member">
                                Member
                            </option>

                            <option value="Manager">
                                Manager
                            </option>

                            <option value="Admin">
                                Admin
                            </option>

                        </select>

                    </div>


                    {/* Actions */}

                    <div className="team-modal-actions">

                        <button
                            type="button"
                            className="team-cancel-btn"
                            onClick={onClose}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="team-save-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : member
                                    ? "Update Member"
                                    : "Add Member"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default TeamModal;