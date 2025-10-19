import { useState } from "react";

export default function ChatAsesor() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! Soy tu asesor de Secretos del Agua 🌿 ¿En qué puedo ayudarte hoy?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://lafm.app.n8n.cloud/webhook-test/asesor-secretos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: input })
      });
      const data = await res.json();
      const botMsg = {
        from: "bot",
        text: `Te recomiendo el **${data.producto}** 💧\n${data.descripcion}\n👉 [Ver producto](${data.url})`
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: "bot", text: "Lo siento, ha ocurrido un error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-2xl shadow bg-white">
      <h2 className="text-xl font-semibold mb-3 text-center text-emerald-700">
        Asesor Secretos del Agua
      </h2>
      <div className="h-96 overflow-y-auto p-2 border rounded-md mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.from === "bot" ? "text-left" : "text-right"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-2xl ${
                msg.from === "bot"
                  ? "bg-emerald-100 text-gray-800"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-400">Pensando...</p>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
