import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import getMessageFromMistral from "./ai.js";

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

  async function getMessage() {
    const msgdata = await getMessageFromMistral(messages[messages.length - 1]);
    setMessages((prevMsg) => [...prevMsg, msgdata]);
    console.log(msgdata);
  }

  return (
    <>
      <section className="messages-container">{messagesChat}</section>
      <button className="sendButton" onClick={getMessage}>
        Send Message
      </button>
    </>
  );
}

export default App;
