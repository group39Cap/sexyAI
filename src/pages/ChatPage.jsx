
import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGroq } from "../api/search";
import { Send, ExternalLink, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import MessageComponent from "../components/MessageComponent";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const botReply = await sendMessageToGroq(input);
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I couldn't process your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Start a new conversation</h2>
            <p className="text-gray-600 max-w-md mb-8">
              Ask me anything about world events, scientific concepts, or creative ideas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
              {[
                "What are the latest breakthroughs in AI?",
                "How does quantum computing work?",
                "What's the impact of climate change on ocean ecosystems?",
                "What are the top startups to watch in 2025?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <MessageComponent key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500 p-4 rounded-lg bg-white border border-gray-200">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                </div>
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: "60px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`absolute right-3 bottom-3 p-2 rounded-full ${
                !input.trim() || isLoading
                  ? "text-gray-400 bg-gray-100"
                  : "text-white bg-purple-600 hover:bg-purple-700"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Powered by Groq LLM API • Updated March 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;