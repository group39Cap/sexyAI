import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Get <span className="text-purple-600">instant answers</span> from AI
        </h1>
        <p className="text-xl text-gray-600">
          Ask questions, get insights, and explore information with our AI-powered search.
        </p>
        
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-full px-5 py-4 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Link to="/chat" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600">
            <Search size={24} />
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          <span>Examples:</span>
          <Link to="/chat" className="hover:text-purple-600">
            "What are the latest advancements in quantum computing?"
          </Link>
          <Link to="/chat" className="hover:text-purple-600">
            "Explain recent climate policy changes in the EU"
          </Link>
          <Link to="/chat" className="hover:text-purple-600">
            "Top tourist destinations in Japan for 2025"
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;