import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="hero bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">About Us</h1>
          <p className="text-lg sm:text-xl mb-8">
            We're a team of passionate individuals working to improve healthcare with technology.
          </p>
          <a href="#team" className="bg-white text-blue-600 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all">
            Meet the Team
          </a>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            We aim to build innovative and accessible healthcare solutions that empower both professionals and patients.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="text-xl font-semibold mb-2">Me--&gt;&gt;</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="https://plus.unsplash.com/premium_photo-1723541849330-cab9c6ed74d4?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Team Member" />
              <h3 className="text-xl font-semibold mb-2">Aryan singh</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            {/* Team Member 3 */}
            <div className="team-member bg-gray-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="text-xl font-semibold mb-2">&lt;&lt;&lt;---Myself</h3>
              <p className="text-gray-600">UI/UX lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision bg-blue-50 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Our Vision</h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            We envision a world where healthcare is easily accessible, seamless, and patient-centric, thanks to technology.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">&copy; 2024 Healthcare Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
