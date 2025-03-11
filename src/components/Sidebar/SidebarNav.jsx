import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarNav.css';

const SidebarNav = () => {
  const recentSearch = "how do i run a react project";
  
  return (
    <nav className="sidebar-nav">
      <ul>
        <li>
          <NavLink to="/home" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/discover" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>Discover</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/spaces" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"></path>
              <circle cx="18" cy="15" r="3"></circle>
              <path d="M18 18v2"></path>
            </svg>
            <span>Spaces</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/library" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>Library</span>
          </NavLink>
        </li>
        <li className="recent-search">
          <NavLink to={`/search?q=${encodeURIComponent(recentSearch)}`} className="nav-item">
            {recentSearch}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;