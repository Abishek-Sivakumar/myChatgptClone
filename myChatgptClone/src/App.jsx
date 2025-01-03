import { useState, useEffect } from "react";
import "./App.css";
import getMessageFromMistral from "./ai.js";
import { nanoid } from "nanoid";

function App() {
  const [message, setMessage] = useState([
    {
      type: "user",
      msg: "Hello I am Abishek",
    },
  ]);

  // useEffect(() => {
  //   setMessageFromUser((initialMsg) => [...initialMsg, "Hello Mistral"]);
  // });

  const messagesChat = message.map((chat) => (
    <div className="message-div" key={nanoid()}>
      <h2>{chat.msg}</h2>
    </div>
  ));

  console.log(messagesChat);

  // function getMessage(formData) {
  //   console.log(formData.get("userInput"));
  // }

  async function getMessages(formData) {
    const userInput = formData.get("userInput");
    setMessage((prevMsg) => [
      ...prevMsg,
      {
        type: "user",
        msg: userInput,
      },
    ]);
    console.log(message);
    const msgData = await getMessageFromMistral(userInput);
    setMessage((prevBotMsg) => [
      ...prevBotMsg,
      {
        type: "bot",
        msg: msgData,
      },
    ]);
    console.log(msgData);
  }

  return (
    <>
      <section className="messages-container">{messagesChat}</section>
      <form action={getMessages}>
        <input
          type="text"
          id="userInput"
          name="userInput"
          placeholder="How Can I help You Today"
        ></input>
        <button className="sendButton">Send Message</button>
      </form>
    </>
  );
}

export default App;
