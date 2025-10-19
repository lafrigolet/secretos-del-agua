// server/routes-example.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createConversationalRetrievalChain } from "@langchain/core/chains/conversational_retrieval";
import { ChatOpenAI } from "@langchain/openai";

const router = express.Router();

// Inicialización del LLM
const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

async function initVectorStore() {
  const text = `
    Aquí tu contenido de referencia: por ejemplo descripción de productos de Secretos del Agua,
    ingredientes, beneficios, rituales de uso, etc.
  `;
  // Divide en “chunks”
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 150 });
  const docs = await splitter.createDocuments([text]);
  // Embeddings
  const embeddings = new OpenAIEmbeddings();
  // Crear vector store desde documentos
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  return vectorStore;
}

(async () => {
  const vectorStore = await initVectorStore();
  const chain = await createConversationalRetrievalChain({
    llm,
    retriever: vectorStore.asRetriever({ k: 3 }),
  });

  router.post("/", async (req, res) => {
    const { message } = req.body;
    const response = await chain.invoke({ input: message });
    res.json({ reply: response.output_text });
  });
})();

export { router };
