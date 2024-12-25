// src/components/Footer.js
import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="footer-about flex flex-col space-y-4">
            <a href="/" className="logo flex items-center space-x-2">
              <span className="sitename text-2xl font-bold text-white">Hospital Management System</span>
            </a>
            <div className="footer-contact">
              <p className="text-gray-400">A108 Adam Street, New York, NY 535022</p>
              <p className="mt-2 text-gray-400"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
              <p className="text-gray-400"><strong>Email:</strong> <span>info@hospital.com</span></p>
            </div>
            <div className="social-links flex space-x-6 mt-4">
              <a href="https://twitter.com" className="text-2xl text-blue-500 hover:text-white"><FaTwitter /></a>
              <a href="https://facebook.com" className="text-2xl text-blue-600 hover:text-white"><FaFacebook /></a>
              <a href="https://instagram.com" className="text-2xl text-pink-500 hover:text-white"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-2xl text-blue-700 hover:text-white"><FaLinkedin /></a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="footer-links flex flex-col space-y-4">
            <h4 className="text-lg font-semibold text-white">Useful Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Empty Column for Alignment (flexible space) */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto text-center mt-8 border-t border-gray-600 pt-6">
        <p className="text-gray-400">© <span>Copyright</span> <strong className="px-1 text-white">Hospital Management System</strong> <span>All Rights Reserved</span></p>
        <div className="credits mt-2 text-gray-400">
          Designed by <a href="https://bootstrapmade.com/" className="hover:text-white">BootstrapMade</a> | Distributed by <a href="https://themewagon.com" className="hover:text-white">ThemeWagon</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
