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
      <div className="chat-header">
        <h1>{headerText}</h1>
        <div className="model-indicator">
          Using model: llama-3.3-70b-versatile
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="welcome-message">
              <h3>Welcome to  Sexy AI</h3>
              <p>How can I help you today?</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
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
          ))
        )}
        
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
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div className="textarea-container">
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
            <button type="button" className="pro-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Pro
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>
            
            <button type="button" className="language-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </button>
            
            <button type="button" className="attach-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>
            
            <button 
              type="submit" 
              className="submit-button" 
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
  );
};

export default SearchHeader;