import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
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
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            toast.error(
                "Please fill all fields"
            );

            return;

        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }


        if (formData.password.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;

        }


        try {

            setLoading(true);


            await register(
                formData.name.trim(),
                formData.email.trim(),
                formData.password
            );


            toast.success(
                "Account created successfully 🎉"
            );


            navigate("/dashboard");


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="auth-page">

            <div className="auth-card">

                {/* Brand */}

                <div className="auth-brand">

                    <div className="auth-logo">
                        T
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
                        Create Account 🚀
                    </h2>

                    <p>
                        Start managing your
                        projects with TaskFlow.
                    </p>

                </div>


                {/* Form */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* Name */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <div className="input-wrapper">

                            <User size={18} />

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                            />

                        </div>

                    </div>


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
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {showPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                                }

                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="input-wrapper">

                            <Lock size={18} />

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={handleChange}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >

                                {showConfirmPassword
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
                            ? "Creating account..."
                            : "Create Account"
                        }

                    </button>

                </form>


                {/* Login */}

                <p className="auth-switch">

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </main>

    );

}

export default Register;