import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMusic, FaPlusCircle, FaChartLine } from 'react-icons/fa'; // Import icons
import '../assets/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <nav className="navbar">
      <h1>Song Management</h1>

      {/* Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Menu Links - Show when menuOpen is true */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/home">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaMusic /> Song List
          </Link>
        </li>
        <li>
          <Link to="/add-song">
            <FaPlusCircle /> Add Song
          </Link>
        </li>
        <li>
          <Link to="/song-stats">
            <FaChartLine /> Statistics
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
