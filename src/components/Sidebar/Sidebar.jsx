import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0D9373" strokeWidth="2" />
            <path d="M2 17L12 22L22 17" stroke="#0D9373" strokeWidth="2" />
            <path d="M2 12L12 17L22 12" stroke="#0D9373" strokeWidth="2" />
          </svg>
          <span className="logo-text">perplexity</span>
        </div>
        <button className="back-button">
          <span>↩</span>
        </button>
      </div>
      
      <div className="new-thread">
        <button className="new-thread-button">
          New Thread
          <span className="shortcut">Ctrl I</span>
        </button>
      </div>
      
      <SidebarNav />
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;