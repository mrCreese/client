import socketIo from "socket.io-client";
import "./App.css";
import { useEffect, useState } from "react";
import SendMessage from "./components/SendMessage";

const socket = socketIo.connect("http://localhost:4051");

function App() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageElenc, setMessageElenc] = useState([]);
  console.log(messageElenc);

  const sendMessage = () => {
    if (user) {
      socket.emit("send_message", { message, user });
      setMessage("");
      setMessageElenc((prev) => [...prev, { user, message, type: "send" }]);
    }
  };

  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessageElenc((prev) => [
        ...prev,
        {
          user: data.user,
          message: data.message,
          type: "recive",
        },
      ]);
    });
  }, [socket]);

  return (
    <div className="App">
      <div className="container_input">
        <input
          placeholder="Username"
          type="text"
          onChange={(event) => setUser(event.target.value)}
        />
        <input
          placeholder="message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <h1>Message</h1>
      <div className="container">
        {messageElenc.map((item, index) => {
          return <SendMessage key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default App;
