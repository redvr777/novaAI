import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.post("/api/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({
        error: "AI is not configured yet. Add your OpenAI API key to the .env file, then restart the server."
      });
    }

    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-24)
      .map(m => ({ role: m.role, content: m.content.slice(0, 12000) }));

    if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== "user") {
      return res.status(400).json({ error: "Send a message to start chatting." });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "You are Nova, a helpful general-purpose AI assistant. Help with a wide range of topics including learning, writing, brainstorming, everyday questions, and programming. Be clear, friendly, accurate, and honest when uncertain. Do not claim to have performed actions you have not performed.",
      input: safeMessages
    });

    res.json({ reply: response.output_text || "I couldn't generate a response. Please try again." });
  } catch (error) {
    console.error("Chat request failed:", error?.message || error);
    res.status(500).json({ error: "Something went wrong while contacting the AI. Check the server console and try again." });
  }
});

app.listen(port, () => {
  console.log(`Everything AI is running at http://localhost:${port}`);
});