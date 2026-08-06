import React from 'react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar-fixed-bar">
      <div className="navbar-glass-shell glass-surface">
        <div className="navbar-branding">
          {theme === 'dark' ? 'Kevin' : 'Kevin'}
        </div>
        <div className="navbar-navigation-links">
          <a href="#home">Home</a>
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#activities">Activities</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="navbar-theme-toggler" onClick={toggleTheme}>
          SWAP TO {theme === 'dark' ? 'LIGHT LAYOUT' : 'DARK LAYOUT'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;