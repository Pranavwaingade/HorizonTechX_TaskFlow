import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    LogOut,
    X,
    Menu,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";


function Sidebar({
    isOpen = false,
    onClose,
    onOpen,
}) {

    const navigate = useNavigate();

    const { user, logout } = useAuth();


    // ========================================
    // Logout
    // ========================================

    const handleLogout = () => {

        logout();

        toast.success(
            "Logged out successfully 👋"
        );

        onClose?.();

        navigate("/login");

    };


    // ========================================
    // Navigation Items
    // ========================================

    const navItems = [

        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },

        {
            label: "Projects",
            path: "/projects",
            icon: FolderKanban,
        },

        {
            label: "Tasks",
            path: "/tasks",
            icon: CheckSquare,
        },

        {
            label: "Team",
            path: "/teams",
            icon: Users,
        },

    ];


    // ========================================
    // Navigation Click
    // ========================================

    const handleNavigation = () => {

        onClose?.();

    };


    return (

        <>

            {/* ==================================
                Mobile Menu Button
            ================================== */}

            <button
                type="button"
                className="mobile-menu-btn"
                onClick={onOpen}
                aria-label="Open menu"
            >

                <Menu size={22} />

            </button>


            {/* ==================================
                Overlay
            ================================== */}

            {isOpen && (

                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />

            )}


            {/* ==================================
                Sidebar
            ================================== */}

            <aside
                className={
                    `sidebar ${
                        isOpen
                            ? "sidebar-open"
                            : ""
                    }`
                }
            >


                {/* ==============================
                    Mobile Close
                ============================== */}

                <button
                    type="button"
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Close menu"
                >

                    <X size={22} />

                </button>


                {/* ==============================
                    Brand
                ============================== */}

                <NavLink
                    to="/dashboard"
                    onClick={handleNavigation}
                    className="sidebar-brand"
                >

                    <div className="brand-logo">
                        T
                    </div>


                    <div>

                        <h2>
                            TaskFlow
                        </h2>

                        <span>
                            Workspace
                        </span>

                    </div>

                </NavLink>


                {/* ==============================
                    Navigation
                ============================== */}

                <nav className="sidebar-nav">

                    <p className="nav-title">
                        MENU
                    </p>


                    {navItems.map((item) => {

                        const Icon = item.icon;


                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={
                                    handleNavigation
                                }
                                className={({
                                    isActive,
                                }) =>
                                    isActive
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                            >

                                <Icon size={19} />

                                <span>
                                    {item.label}
                                </span>

                            </NavLink>

                        );

                    })}

                </nav>


                {/* ==============================
                    Bottom User
                ============================== */}

                <div className="sidebar-bottom">


                    <div className="sidebar-user">

                        <div className="user-avatar">

                            {user?.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}

                        </div>


                        <div className="user-info">

                            <strong>
                                {user?.name ||
                                    "User"}
                            </strong>

                            <span>
                                {user?.email || ""}
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="logout-btn"
                        onClick={handleLogout}
                    >

                        <LogOut size={18} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>

        </>

    );

}


export default Sidebar;