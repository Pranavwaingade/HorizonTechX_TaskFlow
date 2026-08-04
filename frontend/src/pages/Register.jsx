import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import InputField from "../components/auth/InputField";
import "../components/auth/Auth.css";

function Register() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        name: "",
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

        if (!formData.name || !formData.email || !formData.password) {

            return toast.error("Please fill all fields");

        }

        try {

            setLoading(true);

            const { data } = await API.post("/auth/register", formData);

            login(data.user, data.token);

            toast.success(data.message);

            navigate("/dashboard");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

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
                    Create Account
                </h1>

                <p className="auth-subtitle">
                    Join TaskFlow and manage your projects efficiently.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <InputField
                        label="Full Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
                        required
                    />

                    <button
                        className="auth-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Creating Account..."
                                : "Create Account"
                        }
                    </button>

                </form>

                <div className="auth-footer">

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;