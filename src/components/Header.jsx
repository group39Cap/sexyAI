
import React from "react";
import { Link } from "react-router-dom";
import { Search, BellRing, Settings, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold text-xl text-purple-600">Perplexity</Link>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <Search size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <BellRing size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <Settings size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;