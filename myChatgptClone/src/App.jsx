import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import getMessageFromMistral from "./ai.js";
import { nanoid } from "nanoid";

function App() {
  const [messageFromUser, setMessageFromUser] = useState([]);

  const [messageFromBot, setMessageFromBot] = useState([]);

  // useEffect(() => {
  //   setMessageFromUser((initialMsg) => [...initialMsg, "Hello Mistral"]);
  // });

  const messagesChat = messageFromBot.map((msg) => {
    return (
      <div className="message-div" key={nanoid()}>
        <h2>{msg}</h2>
      </div>
    );
  });

  async function getMessage() {
    setMessageFromUser((prevUserMsg) => [
      ...prevUserMsg,
      document.getElementById("userInput").value,
    ]);
    console.log(messageFromUser);
    const msgData = await getMessageFromMistral(
      messageFromUser[messageFromUser.length - 1]
    );
    setMessageFromBot((prevBotMsg) => [...prevBotMsg, msgData]);
    console.log(msgData);
  }

  return (
    <>
      <section className="messages-container">{messagesChat}</section>
      <input
        type="text"
        id="userInput"
        placeholder="How Can I help You Today"
      ></input>
      <button className="sendButton" onClick={getMessage}>
        Send Message
      </button>
    </>
  );
}

export default App;
