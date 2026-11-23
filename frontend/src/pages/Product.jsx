import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/productCard";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            try {
                const response = await api.get("/products");
                if (isMounted) {
                    setProducts(response.data.products || []);
                }
            } catch (err) {
                if (isMounted) {
                    const message =
                        err.response?.data?.message ||
                        (err.response?.status === 401
                            ? "Access Denied. Please log in to view products."
                            : "Failed to load products. Please try again.");
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleDelete = async (productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        setError("");
        setSuccess("");
        try {
            const response = await api.delete(`/products/${productId}`);
            setSuccess(response.data.message || "Product deleted successfully");
            setProducts((prev) => prev.filter((p) => p._id !== productId));
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Failed to delete product. Please try again.";
            setError(message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-500 mt-1">Manage and browse your store inventory</p>
                    </div>

                    <Link
                        to="/add-product"
                        className="inline-flex items-center bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-sm"
                    >
                        <span className="mr-2 text-lg leading-none">+</span> Add Product
                    </Link>
                </div>

                {/* Feedback Alerts */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center justify-between">
                        <div>
                            <span>{error}</span>
                            {error.includes("log in") && (
                                <Link to="/login" className="ml-3 font-semibold underline hover:text-red-900">
                                    Go to Login
                                </Link>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="text-red-500 hover:text-red-700 font-bold ml-4"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center justify-between">
                        <span>{success}</span>
                        <button
                            type="button"
                            onClick={() => setSuccess("")}
                            className="text-green-500 hover:text-green-700 font-bold ml-4"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="bg-white rounded-lg shadow p-5 border animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="flex gap-3">
                                    <div className="h-9 bg-gray-200 rounded w-16"></div>
                                    <div className="h-9 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && products.length === 0 && !error && (
                    <div className="bg-white rounded-2xl shadow-sm border p-12 text-center max-w-md mx-auto my-12">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                            🛍️
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                        <p className="text-gray-500 mb-6">
                            Your store does not have any products yet. Start by creating one!
                        </p>
                        <Link
                            to="/add-product"
                            className="inline-block bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Add Your First Product
                        </Link>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Product;
