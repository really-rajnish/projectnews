import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: '' },
    { path: '/category/general', label: 'General', icon: '' },
    { path: '/category/technology', label: 'Tech', icon: '' },
    { path: '/category/business', label: 'Business', icon: '' },
    { path: '/category/entertainment', label: 'Entertainment', icon: '' },
    { path: '/category/sports', label: 'Sports', icon: '' },
    { path: '/category/health', label: 'Health', icon: '' },
    { path: '/category/science', label: 'Science', icon: '' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" className="brand-link">
            <span className="brand-icon"></span>
            <span className="brand-name"> NewsAggregator<br></br></span>
          </NavLink>
        </div>
        
        <ul className="nav-menu">
          {navItems.map(item => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                end={item.path === '/'}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;