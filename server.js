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
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});


app.post("/ask", async (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {
      return res.json({
        answer: "Please enter a question."
      });
    }


    const response = await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
          "You are DENIS AI STUDY, a helpful AI tutor. Help students understand lessons, solve assignments, explain topics clearly, and give educational answers."
        },

        {
          role: "user",
          content: question
        }
      ]

    });


    res.json({
      answer: response.choices[0].message.content
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      answer:
      "AI connection error: " + error.message
    });

  }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

console.log(
`DENIS AI STUDY running on port ${PORT}`
);

});