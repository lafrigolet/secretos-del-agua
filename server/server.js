import express from "express";
import { router as chatbotRouter } from "./routes-example.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/chatbot", chatbotRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor del chatbot en http://localhost:${PORT}`);
});
