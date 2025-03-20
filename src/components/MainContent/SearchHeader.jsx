import React, { useContext, useEffect, useRef, useState } from 'react';
import { sendMessageToGroq } from '../api/search';
import { ChatContext } from '../Sidebar/ChatContext';
import './SearchHeader.css';

const SearchHeader = ({ theme }) => {
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
  // useEffect(() => {
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = 'auto';
  //     textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
  //   }
  // }, [searchQuery]);

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
    <div className={`message-chat ${theme}`}>
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
              <h3>Get instant answers with Sexy AI</h3>
              <p>Powered by Llama 3.3, our AI assistant provides accurate information and helpful responses to all your questions.</p>
              
              <div className="features-container">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <h4>Fast Responses</h4>
                  <p>Get intelligent responses in seconds</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4M12 8h.01"></path>
                    </svg>
                  </div>
                  <h4>Smart Answers</h4>
                  <p>Intelligent insights from the latest tech</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="12" x2="15" y2="12"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <h4>Easy to Use</h4>
                  <p>Just type and get answers instantly</p>
                </div>
              </div>
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
                  {msg.role === 'user' ? 'You' : 'Sexy'}
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
          <form onSubmit={handleSubmit} className="search-form">
            <div className={`search-input-container ${!chatStarted ? 'centered' : ''}`}>
              <textarea
                ref={textareaRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                disabled={isLoading}
                className="search-textarea"
              />
              {!chatStarted && (
               <div className="input-buttons">
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
              )}
            </div>
            
            {chatStarted && (
              <div className="input-buttons">
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;