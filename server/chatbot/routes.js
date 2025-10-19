import express from "express";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/community/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createConversationalRetrievalChain } from "@langchain/core/chains/conversational_retrieval";

export const router = express.Router();

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

// Example text (replace with real content)
const sampleText =
  "Secretos del Agua crea productos capilares naturales sin siliconas...";
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await splitter.createDocuments([sampleText]);
const embeddings = new OpenAIEmbeddings();
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

const chain = await createConversationalRetrievalChain({
  llm,
  retriever: vectorStore.asRetriever({ k: 3 }),
});

router.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await chain.invoke({ input: message });
  res.json({ reply: response.output_text });
});
