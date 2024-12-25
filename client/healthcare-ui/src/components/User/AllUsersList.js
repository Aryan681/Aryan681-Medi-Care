import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa"; // Add more icons if needed

import Footer from "../beeds/Footer";

const UserCard = ({ user, onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleRoleChange = async (newRole) => {
    const token = localStorage.getItem("token"); // Get the JWT token from localStorage

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/assign-role",
        { userId: user._id, role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedRole(newRole); // Update the role in the local state
        onRoleChange(user._id, newRole); // Inform the parent component about the role change
      }
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <FaUser className="text-white text-3xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800" style={{ overflowWrap: "anywhere" }}>
            {user.email}
          </h3>
          <p className="text-gray-600">{selectedRole}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-gray-500">
        <FaIdBadge />
        <span>{user._id}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-500 mt-2">
        <FaEnvelope />
        <span className="break-words">{user.email}</span>
      </div>
      
      {/* Dropdown for role selection */}
      <div className="mt-4">
        <select
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    </div>
  );
};


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from localStorage

    // Send GET request with Authorization header
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      })
      .then((response) => {
        setUsers(response.data); // Set users data from API response
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError("Error fetching users or insufficient role.");
        setLoading(false); // Stop loading
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 text-xl">
        Loading users, please wait...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
        <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          All Users
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} onRoleChange={handleRoleChange} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UserList;
