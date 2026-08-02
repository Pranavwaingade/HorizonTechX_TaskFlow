import { Link } from "react-router-dom";
import {
  FolderKanban,
  Users,
  ClipboardList,
  ChartColumn,
  Bell,
  ShieldCheck,
  Rocket,
  ClipboardCheck, BarChart3
} from "lucide-react";
import "./Home.css";

function Home() {
  return (
    <main>

      {/* Hero Section */}

      <section className="hero section">

        <div className="container hero-container">

          {/* Left */}

          <div className="hero-content">

            <span className="hero-badge">
              🚀 Smart Project Management
            </span>

            <h1>
              Work Smarter,
              <span> Collaborate Better.</span>
            </h1>

            <p>
              TaskFlow helps teams organize projects,
              assign tasks, track progress and collaborate
              effortlessly from one beautiful workspace.
            </p>

            <div className="hero-buttons">

              <Link
                to="/register"
                className="primary-btn"
              >
                Get Started
              </Link>

              <Link
                to="/projects"
                className="secondary-btn"
              >
                Explore Projects
              </Link>

            </div>

            <div className="hero-users">

              <span>⭐ Trusted by 1000+ Developers</span>

            </div>

          </div>

          {/* Right */}

          <div className="hero-dashboard">

            <div className="dashboard-card card">

              <h3>Workspace Overview</h3>

              <div className="dashboard-grid">

                <div className="mini-card">
                  <h2>12</h2>
                  <p>Projects</p>
                </div>

                <div className="mini-card">
                  <h2>48</h2>
                  <p>Tasks</p>
                </div>

                <div className="mini-card">
                  <h2>18</h2>
                  <p>Members</p>
                </div>

                <div className="mini-card">
                  <h2>92%</h2>
                  <p>Completed</p>
                </div>

              </div>

              <div className="activity">

                <h4>Recent Activity</h4>

                <ul>

                  <li>✅ Landing Page Completed</li>

                  <li>🎨 Dashboard UI Updated</li>

                  <li>👨‍💻 Backend API Connected</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats section">

        <div className="container">

          <div className="stats-grid">

            <div className="stats-card card">

              <div className="stats-icon">📁</div>

              <h2>120+</h2>

              <p>Projects Completed</p>

            </div>

            <div className="stats-card card">

              <div className="stats-icon">👨‍💻</div>

              <h2>1500+</h2>

              <p>Developers</p>

            </div>

            <div className="stats-card card">

              <div className="stats-icon">✅</div>

              <h2>5000+</h2>

              <p>Tasks Managed</p>

            </div>

            <div className="stats-card card">

              <div className="stats-icon">⭐</div>

              <h2>99%</h2>

              <p>Success Rate</p>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features section">

        <div className="container">

          <div className="section-title">

            <h2>Why Choose TaskFlow?</h2>

            <p>
              Everything your team needs to manage projects efficiently.
            </p>

          </div>

          <div className="features-grid">

            <div className="feature-card card">

              <FolderKanban className="feature-icon" />

              <h3>Project Boards</h3>

              <p>
                Organize projects using beautiful Kanban style boards.
              </p>

            </div>

            <div className="feature-card card">

              <Users className="feature-icon" />

              <h3>Team Collaboration</h3>

              <p>
                Collaborate with your teammates in one shared workspace.
              </p>

            </div>

            <div className="feature-card card">

              <ClipboardList className="feature-icon" />

              <h3>Task Assignment</h3>

              <p>
                Assign tasks, set priorities and deadlines with ease.
              </p>

            </div>

            <div className="feature-card card">

              <ChartColumn className="feature-icon" />

              <h3>Progress Tracking</h3>

              <p>
                Monitor project progress with real-time insights.
              </p>

            </div>

            <div className="feature-card card">

              <Bell className="feature-icon" />

              <h3>Instant Notifications</h3>

              <p>
                Receive updates whenever something important happens.
              </p>

            </div>

            <div className="feature-card card">

              <ShieldCheck className="feature-icon" />

              <h3>Secure Authentication</h3>

              <p>
                JWT based authentication keeps your data safe.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="how section">

        <div className="container">

          <div className="section-title">

            <h2>How It Works</h2>

            <p>
              Start managing your team in just four simple steps.
            </p>

          </div>

          <div className="how-grid">

            <div className="step-card card">

              <div className="step-number">
                01
              </div>

              <Rocket className="step-icon" />

              <h3>Create Project</h3>

              <p>
                Create a workspace for your project in seconds.
              </p>

            </div>

            <div className="step-card card">

              <div className="step-number">
                02
              </div>

              <ClipboardCheck className="step-icon" />

              <h3>Add Tasks</h3>

              <p>
                Break projects into tasks and organize your workflow.
              </p>

            </div>

            <div className="step-card card">

              <div className="step-number">
                03
              </div>

              <Users className="step-icon" />

              <h3>Assign Team</h3>

              <p>
                Invite teammates and assign responsibilities easily.
              </p>

            </div>

            <div className="step-card card">

              <div className="step-number">
                04
              </div>

              <BarChart3 className="step-icon" />

              <h3>Track Progress</h3>

              <p>
                Monitor progress and complete projects on time.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <section className="cta section">

        <div className="container">

          <div className="cta-card">

            <span className="cta-badge">
              🚀 Start Your Journey
            </span>

            <h2>
              Ready to Build Better Projects?
            </h2>

            <p>
              Join thousands of developers and teams using TaskFlow
              to manage projects, collaborate efficiently and deliver
              work faster than ever before.
            </p>

            <div className="cta-buttons">

              <Link
                to="/register"
                className="primary-btn"
              >
                Get Started Free
              </Link>

              <Link
                to="/login"
                className="secondary-btn"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;