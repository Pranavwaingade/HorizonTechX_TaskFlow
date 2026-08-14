import { useEffect, useRef, useState } from "react";
import {
    Bell,
    User,
    LogOut,
    Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Topbar.css";


function Topbar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [profileOpen, setProfileOpen] =
        useState(false);

    const [notificationOpen, setNotificationOpen] =
        useState(false);


    const profileRef = useRef(null);
    const notificationRef = useRef(null);


    // ========================================
    // User
    // ========================================

    const userName =
        user?.name ||
        "User";

    const userEmail =
        user?.email ||
        "";

    const userInitial =
        userName
            .charAt(0)
            .toUpperCase() ||
        "U";


    // ========================================
    // Close Dropdowns Outside Click
    // ========================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {

                setProfileOpen(false);

            }

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {

                setNotificationOpen(false);

            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // ========================================
    // Notification
    // ========================================

    const handleNotificationClick = () => {

        setNotificationOpen(
            (previous) => !previous
        );

        setProfileOpen(false);

    };


    // ========================================
    // Profile
    // ========================================

    const handleProfileClick = () => {

        setProfileOpen(
            (previous) => !previous
        );

        setNotificationOpen(false);

    };


    // ========================================
    // Profile
    // ========================================

    const handleProfile = () => {

        setProfileOpen(false);

        navigate("/profile");

    };


    // ========================================
    // Settings
    // ========================================

    const handleSettings = () => {

        setProfileOpen(false);

        navigate("/settings");

    };


    // ========================================
    // Logout
    // ========================================

    const handleLogout = () => {

        setProfileOpen(false);

        logout();

        navigate(
            "/login",
            {
                replace: true,
            }
        );

    };


    // ========================================
    // UI
    // ========================================

    return (

        <header className="app-topbar">

            <div className="topbar-right">


                {/* =================================
                    Notification
                ================================= */}

                <div
                    className="topbar-dropdown-wrapper"
                    ref={notificationRef}
                >

                    <button
                        type="button"
                        className={`notification-btn ${
                            notificationOpen
                                ? "active"
                                : ""
                        }`}
                        aria-label="Notifications"
                        onClick={
                            handleNotificationClick
                        }
                    >

                        <Bell size={19} />

                        <span className="notification-dot" />

                    </button>


                    {notificationOpen && (

                        <div className="topbar-dropdown notification-dropdown">

                            <div className="dropdown-header">

                                <div>

                                    <strong>
                                        Notifications
                                    </strong>

                                    <span>
                                        Stay updated
                                    </span>

                                </div>

                            </div>


                            <div className="notification-empty">

                                <div className="notification-empty-icon">

                                    <Bell size={20} />

                                </div>

                                <strong>
                                    No new notifications
                                </strong>

                                <span>
                                    You're all caught up.
                                </span>

                            </div>

                        </div>

                    )}

                </div>


                <div className="topbar-divider" />


                {/* =================================
                    User
                ================================= */}

                <div
                    className="topbar-dropdown-wrapper"
                    ref={profileRef}
                >

                    <button
                        type="button"
                        className="topbar-user"
                        onClick={
                            handleProfileClick
                        }
                    >

                        <div className="topbar-avatar">

                            {user?.avatar ? (

                                <img
                                    src={
                                        user.avatar
                                    }
                                    alt={userName}
                                />

                            ) : (

                                userInitial

                            )}

                        </div>


                        <div className="topbar-user-info">

                            <strong>
                                {userName}
                            </strong>

                            <span>
                                {userEmail ||
                                    "Workspace"}
                            </span>

                        </div>

                    </button>


                    {/* Profile Dropdown */}

                    {profileOpen && (

                        <div className="topbar-dropdown profile-dropdown">


                            {/* User */}

                            <div className="profile-dropdown-user">

                                <div className="profile-large-avatar">

                                    {user?.avatar ? (

                                        <img
                                            src={
                                                user.avatar
                                            }
                                            alt={
                                                userName
                                            }
                                        />

                                    ) : (

                                        userInitial

                                    )}

                                </div>


                                <div>

                                    <strong>
                                        {userName}
                                    </strong>

                                    <span>
                                        {userEmail}
                                    </span>

                                </div>

                            </div>


                            <div className="dropdown-separator" />


                            {/* Profile */}

                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={
                                    handleProfile
                                }
                            >

                                <User size={17} />

                                <span>
                                    Profile
                                </span>

                            </button>


                            {/* Settings */}

                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={
                                    handleSettings
                                }
                            >

                                <Settings size={17} />

                                <span>
                                    Settings
                                </span>

                            </button>


                            <div className="dropdown-separator" />


                            {/* Logout */}

                            <button
                                type="button"
                                className="dropdown-item logout-item"
                                onClick={
                                    handleLogout
                                }
                            >

                                <LogOut size={17} />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}


export default Topbar;