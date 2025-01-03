import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center text-white py-24 px-6 md:px-12 bg-gradient-to-r from-blue-500 to-indigo-500">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
            Welcome to Healthcare Hub
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-shadow-md">
            A modern platform to manage patient data securely and efficiently.
          </p>
          <button className="bg-white text-blue-500 font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-bold text-blue-500 mb-4">Secure Data</h3>
              <p className="text-gray-600">
                We prioritize your privacy with state-of-the-art encryption and security protocols.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-bold text-blue-500 mb-4">Easy Management</h3>
              <p className="text-gray-600">
                Streamlined patient data management with an intuitive and responsive interface.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-bold text-blue-500 mb-4">Real-Time Insights</h3>
              <p className="text-gray-600">
                Get real-time updates and analytics to make informed decisions quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="bg-blue-500 text-white py-16 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-shadow-lg">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-shadow-md">
            Join our platform today and experience the future of healthcare management.
          </p>
          <button className="bg-white text-blue-500 font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            Get Started Now
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
