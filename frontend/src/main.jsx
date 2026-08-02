import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";
import "./styles/global.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "10px",
            padding: "14px 18px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);