import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();


    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully 👋");

        navigate("/login");

    };


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


    return (

        <aside className="sidebar">

            {/* ==============================
                Brand
            ============================== */}

            <div className="sidebar-brand">

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

            </div>


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
                            className={({ isActive }) =>
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
                User
            ============================== */}

            <div className="sidebar-bottom">

                <div className="sidebar-user">

                    <div className="user-avatar">

                        {user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}

                    </div>


                    <div className="user-info">

                        <strong>
                            {user?.name || "User"}
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

    );

}

export default Sidebar;