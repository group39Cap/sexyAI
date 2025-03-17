// import React, { useState } from "react";
// import { sendMessageToGroq } from "./api/search";

// const App = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages([...messages, userMessage]);

//     const botReply = await sendMessageToGroq(input);
//     setMessages([...messages, userMessage, { role: "bot", content: botReply }]);
//     setInput("");
//   };

//   return (
//     <div>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
//             <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
};

export default App;

