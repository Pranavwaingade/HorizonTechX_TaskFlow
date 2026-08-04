import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import InputField from "../components/auth/InputField";
import "../components/auth/Auth.css";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {

      return toast.error("Please fill all fields");

    }

    try {

      setLoading(true);

      const { data } = await API.post("/auth/login", formData);

      login(data.user, data.token);

      toast.success(data.message);

      navigate("/dashboard");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-logo">🚀</div>

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue managing your projects.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button
            className="auth-btn"
            disabled={loading}
          >
            {
              loading
                ? "Logging In..."
                : "Login"
            }
          </button>

        </form>

        <div className="auth-footer">

          Don't have an account?

          {" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;