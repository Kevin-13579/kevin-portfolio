import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar-container glass-panel">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Kevin <span className="logo-dot">P</span>
        </Link>
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          {location.pathname === '/admin-panel-secure' && (
            <Link 
              to="/admin-panel-secure" 
              className={`nav-link admin-btn ${location.pathname === '/admin-panel-secure' ? 'active' : ''}`}
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;