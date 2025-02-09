import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Clueless</Link>
      </div>
      <div className="navbar-links">
        <Link to="/wardrobe">Wardrobe</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/history">History</Link>
        <Link to="/suggestions">Suggestions</Link>
      </div>
    </nav>
  );
};

export default Navbar;