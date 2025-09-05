import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">🧠 Quiz Master</Link>
        <div className="navbar-actions">
          {!isHome && (
            <Link to="/" className="btn btn-secondary">Home</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


