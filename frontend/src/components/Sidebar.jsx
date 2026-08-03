import { NavLink } from "react-router-dom";
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

import "./Sidebar.css";

function Sidebar() {
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

        <NavLink to="/tasks">
          <CheckSquare size={20} />
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/team">
          <Users size={20} />
          <span>Team</span>
        </NavLink>

        <NavLink to="/comments">
          <MessageSquare size={20} />
          <span>Comments</span>
        </NavLink>

        <NavLink to="/profile">
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Bottom */}

      <div className="sidebar-bottom">

        <button className="logout-sidebar">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;