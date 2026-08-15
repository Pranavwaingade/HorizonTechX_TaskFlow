import { useState } from "react";
import {
    User,
    Mail,
    Pencil,
    Save,
    Lock,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import API from "../services/api";

import "./Profile.css";


function Profile() {

    const { user } = useAuth();

    const [editing, setEditing] =
        useState(false);

    const [name, setName] =
        useState(user?.name || "");

    const [email] =
        useState(user?.email || "");

    const [saving, setSaving] =
        useState(false);


    // ========================================
    // User
    // ========================================

    const userInitial =
        name?.charAt(0)?.toUpperCase() || "U";


    // ========================================
    // Save Profile
    // ========================================

    const handleSave = async () => {

        if (!name.trim()) {

            toast.error(
                "Name cannot be empty"
            );

            return;

        }


        try {

            setSaving(true);

            const { data } =
                await API.put(
                    "/auth/profile",
                    {
                        name: name.trim(),
                    }
                );


            if (data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

            }


            toast.success(
                "Profile updated successfully ✅"
            );

            setEditing(false);

        } catch (error) {

            console.log(
                "Profile update error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================
    // UI
    // ========================================

    return (

        <section className="profile-page">


            {/* Header */}

            <div className="profile-header">

                <div>

                    <p className="page-label">
                        Account
                    </p>

                    <h1>
                        Profile
                    </h1>

                    <p className="page-description">
                        Manage your personal information
                        and account details.
                    </p>

                </div>

            </div>


            {/* Profile Card */}

            <div className="profile-card">


                {/* Profile Top */}

                <div className="profile-card-top">


                    <div className="profile-avatar">

                        {user?.avatar ? (

                            <img
                                src={user.avatar}
                                alt={name}
                            />

                        ) : (

                            userInitial

                        )}

                    </div>


                    <div className="profile-user-heading">

                        <h2>
                            {name || "User"}
                        </h2>

                        <p>
                            {email}
                        </p>

                    </div>


                    {!editing && (

                        <button
                            type="button"
                            className="profile-edit-btn"
                            onClick={() =>
                                setEditing(true)
                            }
                        >

                            <Pencil size={16} />

                            Edit Profile

                        </button>

                    )}

                </div>


                <div className="profile-divider" />


                {/* Information */}

                <div className="profile-section">

                    <div className="profile-section-title">

                        <User size={18} />

                        <div>

                            <h3>
                                Personal Information
                            </h3>

                            <p>
                                Your basic account information.
                            </p>

                        </div>

                    </div>


                    <div className="profile-fields">


                        {/* Name */}

                        <div className="profile-field">

                            <label>
                                Full Name
                            </label>

                            <div className="profile-input-wrap">

                                <User size={17} />

                                <input
                                    type="text"
                                    value={name}
                                    disabled={!editing}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* Email */}

                        <div className="profile-field">

                            <label>
                                Email Address
                            </label>

                            <div className="profile-input-wrap">

                                <Mail size={17} />

                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                />

                            </div>

                            <span className="field-hint">
                                Email cannot be changed.
                            </span>

                        </div>

                    </div>


                    {/* Save */}

                    {editing && (

                        <div className="profile-actions">

                            <button
                                type="button"
                                className="profile-cancel-btn"
                                onClick={() => {

                                    setName(
                                        user?.name || ""
                                    );

                                    setEditing(false);

                                }}
                                disabled={saving}
                            >

                                Cancel

                            </button>


                            <button
                                type="button"
                                className="profile-save-btn"
                                onClick={handleSave}
                                disabled={saving}
                            >

                                <Save size={16} />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    )}

                </div>


                <div className="profile-divider" />


                {/* Security */}

                <div className="profile-section security-section">

                    <div className="profile-section-title">

                        <Lock size={18} />

                        <div>

                            <h3>
                                Security
                            </h3>

                            <p>
                                Keep your account secure.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="change-password-btn"
                        onClick={() =>
                            toast(
                                "Change password will be added next 🔐"
                            )
                        }
                    >

                        <Lock size={16} />

                        Change Password

                    </button>

                </div>

            </div>

        </section>

    );

}


export default Profile;