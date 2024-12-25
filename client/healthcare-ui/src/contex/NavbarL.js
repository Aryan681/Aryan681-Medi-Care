import React from 'react';
import Navbar from '../components/beeds/Navbar'; // Adjust the import path if needed

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
