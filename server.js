const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/ask", async (req, res) => {

  try {

    const { question } = req.body;

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content: `You are DENIS GODSON AI STUDY.

Your mission is to help students learn in a clear, friendly and professional way.

Rules:

• Explain concepts simply.

• Solve mathematics step by step.

• Generate quizzes with answers.

• Create flashcards in this format:

Front: ...

Back: ...

• Summarize long notes into study points.

• Improve essays while teaching the student.

• Encourage learning instead of only giving final answers.

Always format your responses neatly using headings and bullet points when appropriate.`

        },

        {

          role: "user",

          content: question

        }

      ],

      temperature: 0.4,

      max_completion_tokens: 2048

    });

    res.json({

      answer:
      completion.choices[0].message.content

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      answer:
      "❌ Sorry, DENIS GODSON AI STUDY is temporarily unavailable. Please try again."

    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`🚀 DENIS GODSON AI STUDY is running on port ${PORT}`);

});