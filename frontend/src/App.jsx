import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<h1>Home Page</h1>}
      />

      <Route
        path="/login"
        element={<h1>Login Page</h1>}
      />

      <Route
        path="/register"
        element={<h1>Register Page</h1>}
      />

      <Route
        path="/dashboard"
        element={<h1>Dashboard</h1>}
      />

      <Route
        path="/projects"
        element={<h1>Projects</h1>}
      />

      <Route
        path="/projects/:id"
        element={<h1>Project Details</h1>}
      />

      <Route
        path="/profile"
        element={<h1>Profile</h1>}
      />

      <Route
        path="*"
        element={<h1>404 Not Found</h1>}
      />

    </Routes>
  );
}

export default App;