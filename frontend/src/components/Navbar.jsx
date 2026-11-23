import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    E-Commerce
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/product" className="text-gray-700 hover:text-blue-600">
                                Product
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-blue-600">
                                Login
                            </Link>
                            <Link to="/register" className="text-gray-700 hover:text-blue-600">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


