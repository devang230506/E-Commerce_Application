
import { Link } from "react-router-dom";

function ProductCard({ product, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-5 border hover:shadow-lg transition-shadow duration-200">

            <h2 className="text-xl font-semibold mb-2">
                {product.name}
            </h2>

            <p className="text-gray-600 mb-4">
                {product.description}
            </p>

            <p className="text-lg font-bold text-blue-600 mb-4">
                ₹{product.price}
            </p>

            <div className="flex gap-3">
                <Link
                    to={`/edit-product/${product._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-200"
                >
                    Edit
                </Link>

                <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                    Delete
                </button>
            </div>

        </div>
    );
}

export default ProductCard;
