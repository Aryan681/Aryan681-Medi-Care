import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token and email from localStorage
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setUserEmail(email || 'User');
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDashboardRedirect = () => {
    const role = localStorage.getItem('role');
    if (role) {
      navigate(`/dashboard/${role.toLowerCase()}`);
    } else {
      navigate('/dashboard'); // Default dashboard
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Health<span className="text-gray-700">Care</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
          <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>
           <button
              onClick={handleDashboardRedirect}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </button>
           
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* Right Corner */}
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Icon"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{userEmail}</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="space-y-2 py-4 px-4">
            <button
              onClick={() => {
                handleDashboardRedirect();
                toggleMobileMenu();
              }}
              className="block text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </button>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-blue-600 font-medium transition"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 hover:text-blue-600 font-medium transition"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-600 font-medium transition"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
