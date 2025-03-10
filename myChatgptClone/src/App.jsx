import { useState } from "react";
import "./App.css";
import getMessageFromMistral from "./ai.js";
import { nanoid } from "nanoid";

function App() {
  const [message, setMessage] = useState([
    {
      id: nanoid(),
      type: "bot",
      msg: "Hello, I am ChatBot created by Team 12 for the Mini Project 2",
    },
  ]);

  const [listening, setListening] = useState(false);
  const [userInput, setUserInput] = useState(""); // To update input field dynamically
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setUserInput(transcript);
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  // useEffect(() => {
  //   setMessageFromUser((initialMsg) => [...initialMsg, "Hello Mistral"]);
  // });

  async function getMessages(formData) {
    const input = formData.get("userInput");
    setMessage((prevMsg) => [
      ...prevMsg,
      { id: nanoid(), type: "user", msg: input },
    ]);

    const msgData = await getMessageFromMistral(input);
    setMessage((prevBotMsg) => [
      ...prevBotMsg,
      { id: nanoid(), type: "bot", msg: msgData },
    ]);
    setUserInput("");
  }

  // console.log(messagesChat);

  // function getMessage(formData) {
  //   console.log(formData.get("userInput"));
  // }

  return (
    <>
      <section className="messages-container">
        {message.map((chat) => (
          <div
            className={chat.type === "user" ? "userMsg" : null}
            key={chat.id}
          >
            <h2>{chat.msg}</h2>
            <h3>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // hour12: false, To display time in 24-hour format without am and pm
              })}
            </h3>
          </div>
        ))}
      </section>

      <div className="empty-div"></div>

      <form action={getMessages} className="input-form">
        <input
          type="text"
          id="userInput"
          name="userInput"
          placeholder="How can I help you today?"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className={listening ? "stopButton" : "listenButton"}
          type="button"
          onClick={listening ? stopListening : startListening}
        >
          {listening ? "Stop" : "Record"}
        </button>
        <button className="sendButton">Send Message</button>
      </form>
    </>
  );
}

export default App;
