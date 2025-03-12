import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import './Sidebar.css';

// You'll need to create this context in your App.js or a separate file
import { ChatContext } from './ChatContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { resetChat } = useContext(ChatContext);

  const handleNewThread = () => {
    resetChat(); // Clear the current chat messages
    navigate('/chat'); 
  };

  const handleHome = () => {
    navigate('/chat');// home navigation
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo" onClick={handleHome} role="button" tabIndex={0}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0D9373" strokeWidth="2" />
            <path d="M2 17L12 22L22 17" stroke="#0D9373" strokeWidth="2" />
            <path d="M2 12L12 17L22 12" stroke="#0D9373" strokeWidth="2" />
          </svg>
          <span className="logo-text">Sexy AI</span>
        </div>
        <button className="back-button" onClick={handleHome}>
          <span>↩</span>
        </button>
      </div>
      <div className="new-thread">
        <button className="new-thread-button" onClick={handleNewThread}>
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