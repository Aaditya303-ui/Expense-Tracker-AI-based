// import React, { useState, useRef, useEffect, useContext } from "react";
// import "../Styling/ai.css";
// import ChatbotIcon from "../images/chatbot.png";
// import { FinanceContext } from "../Components/FinanceContext"; // ✅ import context

// function AIInsights() {
//   const API_KEY = "AIzaSyC9YUe8Fv54ZFhnocmWyewouorCZSa7o-M";
//   const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

//   const [messages, setMessages] = useState([
//     { text: "Hey there 👋 How can I help you?", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");

//   // ✅ Get financial records from global context
//   const { records } = useContext(FinanceContext);

//   const chatBodyRef = useRef(null);

//   const generateBotResponse = async (userMessage) => {
//     try {
//       // Always attach records to the prompt
//       const recordsText = records
//         .map(
//           (r, i) =>
//             `Record ${i + 1}: Income = ${r.income}, Expense = ${r.expense}, Category = ${r.category}`
//         )
//         .join("\n");

//       const finalMessage = `
//       Here are my financial records:
//       ${recordsText}

//       User's question: ${userMessage}

//       Please answer based on the above records, giving financial suggestions, summaries, or insights as needed.
//       `;

//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [{ text: finalMessage }]
//             }
//           ]
//         })
//       });

//       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

//       const data = await res.json();
//       console.log("Gemini API Response:", data);

//       const botText =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

//       setMessages((prev) => [
//         ...prev.slice(0, -1),
//         { text: botText, sender: "bot" }
//       ]);
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       setMessages((prev) => [
//         ...prev.slice(0, -1),
//         { text: "Error getting response.", sender: "bot" }
//       ]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setMessages((prev) => [
//       ...prev,
//       { text: input, sender: "user" },
//       { text: "Thinking...", sender: "bot" }
//     ]);

//     generateBotResponse(input);
//     setInput("");
//   };

//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="container">
//       <div className="chatbot-popup">
//         {/* Header */}
//         <div className="chat-header">
//           <div className="header-info">
//             <div className="header-left">
//               <img src={ChatbotIcon} alt="Chatbot Icon" />
//               <h2 className="logo-text">Finance Chatbot</h2>
//             </div>
//           </div>
//         </div>

//         {/* Chat body */}
//         <div className="chat-body" ref={chatBodyRef}>
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`message ${
//                 msg.sender === "bot" ? "bot-message" : "user-message"
//               }`}
//             >
//               {msg.sender === "bot" && (
//                 <img src={ChatbotIcon} alt="Bot Avatar" />
//               )}
//               <p className="message-text">{msg.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="chat-footer">
//           <form className="chat-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               className="message-input"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               required
//             />
//             <button type="submit" className="send-btn">
//               <span className="material-symbols-outlined">
//                 keyboard_arrow_up
//               </span>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AIInsights;

import React, { useState, useRef, useEffect, useContext } from "react";
import "../Styling/ai.css";
import ChatbotIcon from "../images/chatbot.png";
import { FinanceContext } from "../Components/FinanceContext"; // ✅ import context

function AIInsights() {
  const API_KEY = "AIzaSyC9YUe8Fv54ZFhnocmWyewouorCZSa7o-M"; // ⚠️ replace with env variable
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const [messages, setMessages] = useState([
    { text: "Hey there 👋 How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ toggle chatbot

  // ✅ Get financial records from global context
  const { records } = useContext(FinanceContext);

  const chatBodyRef = useRef(null);

  const generateBotResponse = async (userMessage) => {
    try {
      const recordsText = records
        .map(
          (r, i) =>
            `Record ${i + 1}: Income = ${r.income}, Expense = ${r.expense}, Category = ${r.category}`
        )
        .join("\n");

      const finalMessage = `
      Here are my financial records:
      ${recordsText}

      User's question: ${userMessage}

      Please answer based on the above records, giving financial suggestions, summaries, or insights as needed.
      `;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: finalMessage }]
            }
          ]
        })
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: botText, sender: "bot" }
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Error getting response.", sender: "bot" }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: input, sender: "user" },
      { text: "Thinking...", sender: "bot" }
    ]);

    generateBotResponse(input);
    setInput("");
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      {/* Floating Chatbot Icon */}
      <button
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={ChatbotIcon} alt="Chatbot Icon" />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="chatbot-popup">
          {/* Header */}
          <div className="chat-header">
            <div className="header-info">
              <div className="header-left">
                <img src={ChatbotIcon} alt="Chatbot Icon" />
                <h2 className="logo-text">BudgetBuddy</h2>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>
          </div>

          {/* Chat body */}
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.sender === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.sender === "bot" && (
                  <img src={ChatbotIcon} alt="Bot Avatar" />
                )}
                <p className="message-text">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="message-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <button type="submit" className="send-btn">
                <span className="material-symbols-outlined">
                  keyboard_arrow_up
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
