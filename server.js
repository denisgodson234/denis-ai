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
      input: `You are DENIS AI STUDY, a friendly AI tutor.

Answer the student's question clearly and simply.

Question:
${question}`
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error("===== OPENAI ERROR =====");
    console.error(error);

    let message = "Unknown server error.";

    if (error.message) {
      message = error.message;
    }

    if (error.error && error.error.message) {
      message = error.error.message;
    }

    res.status(500).json({
      answer: message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DENIS AI STUDY is running on port ${PORT}`);
});