import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.email.trim() ||
            !formData.password
        ) {

            toast.error(
                "Email and password are required"
            );

            return;

        }

        try {

            setLoading(true);

            await login(
                formData.email.trim(),
                formData.password
            );

            toast.success(
                "Login successful 🎉"
            );

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <main className="auth-page">

            <div className="auth-card">

                {/* Logo / Brand */}

                <div className="auth-brand">

                    <div className="auth-logo">
                        P
                    </div>

                    <h1>
                        TaskFlow
                    </h1>

                    <p>
                        Manage projects.
                        Complete tasks.
                    </p>

                </div>


                {/* Heading */}

                <div className="auth-heading">

                    <h2>
                        Welcome Back 👋
                    </h2>

                    <p>
                        Login to continue to your
                        workspace.
                    </p>

                </div>


                {/* Login Form */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* Email */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <div className="input-wrapper">

                            <Mail size={18} />

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />

                        </div>

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">

                            <Lock size={18} />

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                                }

                            </button>

                        </div>

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                {/* Register */}

                <p className="auth-switch">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Create account
                    </Link>

                </p>

            </div>

        </main>

    );

}

export default Login;