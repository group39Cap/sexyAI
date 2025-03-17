import React, { useContext, useEffect, useRef } from 'react';
import { useState } from "react";

import { sendMessageToGroq } from '../api/search';
import { ChatContext } from '../Sidebar/ChatContext';
import './SearchHeader.css';

const SearchHeader = () => {
  const { messages, isLoading, addMessage, setLoading } = useContext(ChatContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerText, setHeaderText] = useState('What do you want to know?');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Determine if the chat has started
  const chatStarted = messages.length > 0 || isLoading;

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const userMessage = { role: 'user', content: searchQuery };
    
    // Update header text with the first query
    if (messages.length === 0) {
      setHeaderText(searchQuery);
    }
    
    addMessage(userMessage);
    setLoading(true);
    setSearchQuery('');

    try {
      const aiResponse = await sendMessageToGroq(searchQuery);
      addMessage({ role: 'assistant', content: aiResponse });
    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage({ 
        role: 'assistant', 
        content: 'I apologize, but I encountered an issue processing your request. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-chat">
      {chatStarted && (
        <div className="chat-header">
          <h1>{headerText}</h1>
          <div className="model-indicator">
            Using model: llama-3.3-70b-versatile
          </div>
        </div>
      )}

      <div className="chat-messages">
        {!chatStarted ? (
          <div className="empty-state">
            <div className="welcome-message">
              <h3>Welcome to Sexy AI</h3>
              <p>How can I help you today?</p>
            </div>
          </div>
        ) : (
          <div className="messages-wrapper">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message-container ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-role">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </div>
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message-container assistant-message">
                <div className="message-role">Sexy</div>
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={`input-container ${chatStarted ? 'bottom' : 'centered'}`}>
        <div className={`input-wrapper ${!chatStarted ? 'centered' : ''}`}>
          <form onSubmit={handleSubmit}>
            <div className={`textarea-container ${!chatStarted ? 'centered' : ''}`}>
              <textarea
                ref={textareaRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                disabled={isLoading}
              />
            </div>
            
            <div className="input-buttons">
              <button 
                type="submit" 
                className={`submit-button ${!chatStarted ? 'centered' : ''}`}
                disabled={isLoading || !searchQuery.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;