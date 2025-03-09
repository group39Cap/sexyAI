
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Compass, BookOpen, Plus, User } from "lucide-react";


const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <MessageSquare size={20} />, label: "Chats", path: "/chat" },
    { icon: <Compass size={20} />, label: "Discover", path: "/discover" },
    { icon: <BookOpen size={20} />, label: "Library", path: "/library" },
  ];
  
  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-md ${
              location.pathname === item.path
                ? "bg-purple-50 text-purple-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2 text-gray-700">
          <User size={20} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;