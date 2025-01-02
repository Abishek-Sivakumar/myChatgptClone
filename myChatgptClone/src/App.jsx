import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    "This is the initial Message",
    "This is the second message",
  ]);

  const messagesChat = messages.map((msg) => {
    return (
      <div className="message-div">
        <h2>{msg}</h2>
      </div>
    );
  });

  return (
    <>
      <section className="messages-container">{messagesChat}</section>
      <button className="sendButton">Send Message</button>
    </>
  );
}

export default App;
