import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Teams from "./pages/Teams";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                    {/* Public Routes */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                    {/* Protected Routes */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<AppLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/projects"
                            element={<Projects />}
                        />
                        
                        <Route
                            path="/projects/:id"
                            element={<ProjectDetails />}
                        />
                        <Route
                            path="/tasks"
                            element={<Tasks />}
                        />
                        <Route
                            path="/tasks/:id"
                            element={<TaskDetails />}
                        />
                        <Route
                            path="/teams"
                            element={<Teams />}
                        />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />


                    </Route>

                </Route>

                    {/* Invalid URL */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;