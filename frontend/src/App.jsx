import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {

  const location = useLocation();

  const authPages =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const dashboardPages =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/projects") ||
    location.pathname.startsWith("/profile");

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>

      {!hideLayout && <Navbar />}

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            {/* <Route path="/team" element={<Team />} /> */}
            {/* <Route path="/comments" element={<Comments />} /> */}
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/settings" element={<Settings />} /> */}

          </Route>

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      {!hideLayout && <Footer />}

    </>
  );
}

export default App;