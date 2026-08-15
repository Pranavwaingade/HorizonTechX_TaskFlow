import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const savedTheme =
    localStorage.getItem("taskflow-theme") || "light";

document.documentElement.setAttribute(
    "data-theme",
    savedTheme
);


ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <AuthProvider>

            <App />
            <Toaster />

        </AuthProvider>

    </React.StrictMode>

);