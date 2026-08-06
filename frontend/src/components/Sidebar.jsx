import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  MessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import "./Sidebar.css";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h2>
          Task<span>Flow</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/projects">
          <FolderKanban size={20} />
          <span>Projects</span>
        </NavLink>

        {/* Coming Soon */}
        <NavLink to="/tasks">
          <CheckSquare size={20} />
          <span>Tasks</span>
        </NavLink>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toast("🚧 Team page coming soon");
          }}
        >
          <Users size={20} />
          <span>Team</span>
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toast("🚧 Comments page coming soon");
          }}
        >
          <MessageSquare size={20} />
          <span>Comments</span>
        </a>
                  <NavLink to="/profile">
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toast("🚧 Settings page coming soon");
          }}
        >
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      {/* Logout */}
      <div className="sidebar-bottom">
        <button
          className="logout-sidebar"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;