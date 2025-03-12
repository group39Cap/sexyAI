import React, { createContext, useState } from 'react';

// Create the context
export const ChatContext = createContext();

// Create a provider component
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to reset the chat
  const resetChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  // Function to add a new message
  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  // Function to set loading state
  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isLoading, 
      resetChat, 
      addMessage, 
      setLoading 
    }}>
      {children}
    </ChatContext.Provider>
  );
};