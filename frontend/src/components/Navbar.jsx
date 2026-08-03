import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          Task<span>Flow</span>
        </Link>

        {/* Navigation */}
        <nav className={menuOpen ? "nav-links active" : "nav-links"}>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/dashboard" onClick={closeMenu}>
            Dashboard
          </NavLink>

          <NavLink to="/projects" onClick={closeMenu}>
            Projects
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              onClick={closeMenu}
            >
              Profile
            </NavLink>
          )}

          {/* Mobile Auth Buttons */}
          <div className="mobile-auth">

            {user ? (
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="login-btn"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="register-btn"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </nav>

        {/* Desktop Auth */}
        <div className="navbar-right">

          {user ? (
            <>
              <span className="user-name">
                {user.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu */}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;