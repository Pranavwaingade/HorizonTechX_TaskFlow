import {
  FaGithub,
  FaLinkedin,
  FaFolderOpen,
} from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Logo */}

          <div className="footer-about">

            <h2>
              Task<span>Flow</span>
            </h2>

            <p>
              TaskFlow is a modern project management platform
              that helps teams organize projects, collaborate
              efficiently and deliver work faster.
            </p>

          </div>

          {/* Quick Links */}

          <div className="footer-links">

            <h3>Quick Links</h3>

            <a href="/">Home</a>

            <a href="/dashboard">Dashboard</a>

            <a href="/projects">Projects</a>

            <a href="/login">Login</a>

          </div>

          {/* Resources */}

          <div className="footer-links">

            <h3>Resources</h3>

            <a href="/">Documentation</a>

            <a href="/">Help Center</a>

            <a href="/">Privacy Policy</a>

            <a href="/">Terms & Conditions</a>

          </div>

          {/* Contact */}

          <div className="footer-contact">

            <h3>Connect</h3>

            <p>

              <IoMail size={18} />

              support@taskflow.com

            </p>

            <div className="social-links">

              <div className="social-links">
                <a href="#">
                  <FaLinkedin size={20} />
                </a>

                <a href="#">
                  <FaGithub size={20} />
                </a>

                <a href="#">
                  <FaFolderOpen size={20} />
                </a>
              </div>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>

            © {new Date().getFullYear()} TaskFlow.

            All Rights Reserved.

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;