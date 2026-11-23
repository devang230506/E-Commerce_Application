import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: ""
    });
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                const product = response.data.product;
                if (isMounted && product) {
                    setFormData({
                        name: product.name || "",
                        description: product.description || "",
                        price: product.price !== undefined ? product.price : ""
                    });
                }
            } catch (err) {
                if (isMounted) {
                    const message =
                        err.response?.data?.message ||
                        (err.response?.status === 404
                            ? "Product not found."
                            : err.response?.status === 401
                                ? "Access Denied. Please log in."
                                : "Failed to fetch product details.");
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setFetching(false);
                }
            }
        };

        if (id) {
            loadProduct();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
        if (success) setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.name.trim()) {
            setError("Product name is required.");
            return;
        }

        if (!formData.description.trim()) {
            setError("Product description is required.");
            return;
        }

        if (formData.price === "" || isNaN(formData.price) || Number(formData.price) <= 0) {
            setError("Please enter a valid positive price.");
            return;
        }

        if (loading) return;

        setLoading(true);
        try {
            const response = await api.put(`/products/${id}`, {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: Number(formData.price)
            });

            setSuccess(response.data.message || "Product updated successfully!");

            setTimeout(() => {
                navigate("/products");
            }, 1500);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Failed to update product. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-7 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border">

                {/* Header */}
                <div className="mb-6">
                    <Link
                        to="/products"
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 mb-3"
                    >
                        ← Back to Products
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-gray-500 text-sm mt-1">Update the product information</p>
                </div>

                {/* Feedback Alerts */}
                {error && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center justify-between">
                        <div>
                            <span>{error}</span>
                            {error.includes("log in") && (
                                <Link to="/login" className="ml-2 font-semibold underline hover:text-red-900">
                                    Login
                                </Link>
                            )}
                        </div>
                        <button type="button" onClick={() => setError("")} className="text-red-500 hover:text-red-700 font-bold ml-2">
                            ✕
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mb-5 p-3.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center justify-between">
                        <span>{success} Redirecting...</span>
                        <button type="button" onClick={() => setSuccess("")} className="text-green-500 hover:text-green-700 font-bold ml-2">
                            ✕
                        </button>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                        ></textarea>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0.01"
                            required
                            disabled={loading}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Saving Changes..." : "Save Changes"}
                        </button>

                        <Link
                            to="/products"
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default EditProduct;
