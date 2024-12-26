import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });

      // Use the response data (e.g., store JWT token in local storage)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('userId', response.data.user.userId); 

      // Redirect after successful registration
      navigate(`/dashboard/${response.data.user.role}`);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 md:w-80 lg:w-96 transform transition-all ease-in-out">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600 animate__animated animate__fadeIn">
          Register
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
