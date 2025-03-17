import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import './Sidebar.css';


import { ChatContext } from './ChatContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { resetChat } = useContext(ChatContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleNewThread = () => {
    resetChat(); 
    navigate('/chat'); 
  };

  const handleHome = () => {
    navigate('/chat');
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {!collapsed && (
        <>
          <div className="sidebar-header">
            <div className="logo" onClick={handleHome} role="button" tabIndex={0}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0D9373" strokeWidth="2" />
                <path d="M2 17L12 22L22 17" stroke="#0D9373" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="#0D9373" strokeWidth="2" />
              </svg>
              <span className="logo-text">Sexy AI</span>
            </div>
            <div className="header-controls">
              <button className="collapse-button" onClick={toggleSidebar} aria-label="Collapse sidebar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="new-thread">
            <button className="new-thread-button" onClick={handleNewThread}>
              New Thread
              <span className="shortcut">Ctrl I</span>
            </button>
          </div>
          <SidebarNav />
          <SidebarFooter />
        </>
      )}
      
      {collapsed && (
        <button className="expand-button" onClick={toggleSidebar} aria-label="Expand sidebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Sidebar;