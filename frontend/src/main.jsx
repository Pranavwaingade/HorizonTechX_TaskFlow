import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import{ AuthProvider} from "./context/AuthContext";

import App from "./App";

import "./index.css";
import "./styles/global.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);