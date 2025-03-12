import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import { ChatProvider } from './components/Sidebar/ChatContext';
import './App.css';

const App = () => {
  return (
    <ChatProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/chat" element={<MainContent />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
};

export default App;