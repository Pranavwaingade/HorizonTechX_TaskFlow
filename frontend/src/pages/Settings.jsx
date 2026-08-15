import { useEffect, useState } from "react";
import {
    Bell,
    Palette,
    Shield,
    Moon,
    Sun,
    Check,
} from "lucide-react";
import toast from "react-hot-toast";

import "./Settings.css";


function Settings() {

    // ========================================
    // Load Saved Settings
    // ========================================

    const getSavedSettings = () => {

        try {

            const saved =
                localStorage.getItem(
                    "taskflow-settings"
                );

            return saved
                ? JSON.parse(saved)
                : {};

        } catch {

            return {};

        }

    };


    const savedSettings =
        getSavedSettings();

    const savedTheme =
    localStorage.getItem("taskflow-theme");


    // ========================================
    // State
    // ========================================

    const [emailNotifications, setEmailNotifications] =
        useState(
            savedSettings.emailNotifications ??
            true
        );

    const [taskNotifications, setTaskNotifications] =
        useState(
            savedSettings.taskNotifications ??
            true
        );

    const [projectNotifications, setProjectNotifications] =
        useState(
            savedSettings.projectNotifications ??
            true
        );

const [theme, setTheme] =
    useState(
        savedTheme ||
        savedSettings.theme ||
        "light"
    );

    // ========================================
    // Apply Theme
    // ========================================

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "taskflow-theme",
            theme
        );

    }, [theme]);


    // ========================================
    // Save Settings
    // ========================================

    
    const handleSave = () => {

        const settings = {

            emailNotifications,

            taskNotifications,

            projectNotifications,

            theme,

        };


        localStorage.setItem(
            "taskflow-settings",
            JSON.stringify(settings)
        );


        toast.success(
            "Settings saved successfully ✅"
        );

    };


    // ========================================
    // UI
    // ========================================

    return (

        <section className="settings-page">


            {/* =================================
                Header
            ================================= */}

            <div className="settings-header">

                <p className="page-label">
                    Workspace
                </p>

                <h1>
                    Settings
                </h1>

                <p className="page-description">
                    Manage your TaskFlow preferences
                    and workspace experience.
                </p>

            </div>


            {/* =================================
                Settings Card
            ================================= */}

            <div className="settings-card">


                {/* =================================
                    Notifications
                ================================= */}

                <div className="settings-section">

                    <div className="settings-section-heading">

                        <div className="settings-section-icon">

                            <Bell size={18} />

                        </div>

                        <div>

                            <h2>
                                Notifications
                            </h2>

                            <p>
                                Choose which notifications
                                you want to receive.
                            </p>

                        </div>

                    </div>


                    <div className="settings-options">


                        {/* Email */}

                        <div className="setting-row">

                            <div>

                                <strong>
                                    Email notifications
                                </strong>

                                <span>
                                    Receive important
                                    updates by email.
                                </span>

                            </div>


                            <button
                                type="button"
                                className={`settings-toggle ${
                                    emailNotifications
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setEmailNotifications(
                                        (previous) =>
                                            !previous
                                    )
                                }
                            >

                                <span />

                            </button>

                        </div>


                        {/* Tasks */}

                        <div className="setting-row">

                            <div>

                                <strong>
                                    Task notifications
                                </strong>

                                <span>
                                    Get notified about task
                                    assignments and updates.
                                </span>

                            </div>


                            <button
                                type="button"
                                className={`settings-toggle ${
                                    taskNotifications
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setTaskNotifications(
                                        (previous) =>
                                            !previous
                                    )
                                }
                            >

                                <span />

                            </button>

                        </div>


                        {/* Projects */}

                        <div className="setting-row">

                            <div>

                                <strong>
                                    Project notifications
                                </strong>

                                <span>
                                    Receive updates about
                                    your projects.
                                </span>

                            </div>


                            <button
                                type="button"
                                className={`settings-toggle ${
                                    projectNotifications
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setProjectNotifications(
                                        (previous) =>
                                            !previous
                                    )
                                }
                            >

                                <span />

                            </button>

                        </div>

                    </div>

                </div>


                <div className="settings-divider" />


                {/* =================================
                    Appearance
                ================================= */}

                <div className="settings-section">

                    <div className="settings-section-heading">

                        <div className="settings-section-icon">

                            <Palette size={18} />

                        </div>

                        <div>

                            <h2>
                                Appearance
                            </h2>

                            <p>
                                Customize how TaskFlow
                                looks for you.
                            </p>

                        </div>

                    </div>


                    <div className="theme-options">


                        {/* Light */}

                        <button
                            type="button"
                            className={`theme-option ${
                                theme === "light"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setTheme("light")
                            }
                        >

                            <div className="theme-option-icon">

                                <Sun size={18} />

                            </div>

                            <div>

                                <strong>
                                    Light
                                </strong>

                                <span>
                                    Clean and bright
                                    interface.
                                </span>

                            </div>


                            {theme === "light" && (

                                <Check
                                    size={17}
                                    className="theme-check"
                                />

                            )}

                        </button>


                        {/* Dark */}

                        <button
                            type="button"
                            className={`theme-option ${
                                theme === "dark"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setTheme("dark")
                            }
                        >

                            <div className="theme-option-icon">

                                <Moon size={18} />

                            </div>

                            <div>

                                <strong>
                                    Dark
                                </strong>

                                <span>
                                    Easier on the eyes
                                    in low light.
                                </span>

                            </div>


                            {theme === "dark" && (

                                <Check
                                    size={17}
                                    className="theme-check"
                                />

                            )}

                        </button>

                    </div>

                </div>


                <div className="settings-divider" />


                {/* =================================
                    Security
                ================================= */}

                <div className="settings-section">

                    <div className="settings-section-heading">

                        <div className="settings-section-icon">

                            <Shield size={18} />

                        </div>

                        <div>

                            <h2>
                                Security
                            </h2>

                            <p>
                                Manage your account
                                security preferences.
                            </p>

                        </div>

                    </div>


                    <div className="security-info">

                        <div>

                            <strong>
                                Account security
                            </strong>

                            <span>
                                Your account is protected
                                using authentication.
                            </span>

                        </div>


                        <span className="security-status">
                            Protected
                        </span>

                    </div>

                </div>


                {/* =================================
                    Save
                ================================= */}

                <div className="settings-footer">

                    <button
                        type="button"
                        className="settings-save-btn"
                        onClick={handleSave}
                    >

                        <Check size={15} />

                        Save Settings

                    </button>

                </div>

            </div>

        </section>

    );

}


export default Settings;