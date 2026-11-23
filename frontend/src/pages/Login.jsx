import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (error) setError("");
        if (success) setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.email.trim() || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        // Log login details to console (password intentionally omitted for security)
        console.log("Login details submitted:", {
            email: formData.email.trim()
        });

        if (loading) return;

        setLoading(true);
        try {
            const response = await api.post("/login", {
                email: formData.email.trim(),
                password: formData.password
            });

            console.log("Login API response:", {
                message: response.data.message,
                user: response.data.user
            });

            if (response.data.token) {
                login(response.data.token, response.data.user);
            }

            setSuccess(response.data.message || "Login successful!");
            setFormData({ email: "", password: "" });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Login failed. Please try again.";
            console.error("Login error:", message);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">E-Commerce</h1>
                    <p className="text-gray-500 mt-2">Welcome back! Login to your account</p>
                </div>

                {/* Feedback Alerts */}
                {error && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center justify-between">
                        <span>{error}</span>
                        <button type="button" onClick={() => setError("")} className="text-red-500 hover:text-red-700 font-bold ml-2">
                            ✕
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mb-5 p-3.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center justify-between">
                        <span>{success}</span>
                        <button type="button" onClick={() => setSuccess("")} className="text-green-500 hover:text-green-700 font-bold ml-2">
                            ✕
                        </button>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-600 hover:text-indigo-800"
                                disabled={loading}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Remember & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input type="checkbox" className="accent-indigo-600" disabled={loading} />
                            Remember me
                        </label>

                        <a href="#" className="text-indigo-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 ${loading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;