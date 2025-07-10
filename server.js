const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON from frontend

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY=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
});
const openai = new OpenAIApi(configuration);

// POST route to handle AI requests
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0].message.content.trim();
    res.json({ answer: reply });
  } catch (error) {
    console.error("Error from OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🧠 WCG AI Server running at http://localhost:${port}`);
});
