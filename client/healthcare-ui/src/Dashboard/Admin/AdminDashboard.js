import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaStethoscope, FaProcedures, FaClipboardList, FaHospitalSymbol } from "react-icons/fa";
import Footer from "../../components/beeds/Footer";
const AdminDashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole !== "Admin") {
      navigate("/login");
    }
  }, [navigate]);

  if (role === null) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  const cards = [
    { title: "All Users", path: "/admin/all-users", icon: <FaUsers className="text-4xl text-blue-600" /> },
    { title: "All Patients", path: "/admin/all-patients", icon: <FaHospitalSymbol className="text-4xl text-green-600" /> },
    { title: "Patient Management", path: "/admin/patient-management", icon: <FaStethoscope className="text-4xl text-teal-600" /> },
    { title: "Event Logging", path: "/admin/event-logging", icon: <FaClipboardList className="text-4xl text-yellow-600" /> },
    { title: "Intervention Forms", path: "/admin/intervention-forms", icon: <FaProcedures className="text-4xl text-red-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-8 shadow-md">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-lg mt-2">Welcome, Admin! Manage the hospital system efficiently.</p>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-700">Admin Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate(card.path)}
            >
              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">{card.title}</h3>
              <p className="text-center text-gray-600 mt-2">
                Manage {card.title.toLowerCase()} efficiently through this section.
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
