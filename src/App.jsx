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



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import "./styles/globals.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;