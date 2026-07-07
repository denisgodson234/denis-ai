const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `You are DENIS AI STUDY, a friendly AI tutor that helps students understand topics, solve assignments, and explain answers clearly.

Student's question:
${question}`
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error("OpenAI Error:", error);

    res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DENIS AI STUDY is running on port ${PORT}`);
});