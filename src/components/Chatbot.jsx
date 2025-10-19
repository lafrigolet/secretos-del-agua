import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage(e) {
    e.preventDefault();
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  }

  return (
    <div>
      <h2>💧 Asesor Secretos del Agua</h2>
      <div>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.sender}:</strong> {m.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

