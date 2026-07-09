const express = require("express");
const cors = require("cors");
const path = require("path");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname)));



const client = new Groq({

    apiKey: process.env.GROQ_API_KEY

});



app.post("/ask", async (req, res) => {


    try {


        const question = req.body.question;



        const completion = await client.chat.completions.create({

            messages: [

                {
                    role: "system",
                    content:
                    "You are DENIS GODSON AI STUDY, a helpful AI tutor for students."
                },


                {
                    role: "user",
                    content: question
                }

            ],


            model: "llama-3.3-70b-versatile"

        });



        res.json({

            answer:
            completion.choices[0].message.content

        });



    } catch(error) {


        console.log(error);


        res.status(500).json({

            answer:
            "AI server error. Check your API key."

        });


    }


});



app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"index.html")
    );

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{


    console.log(
        `🚀 DENIS GODSON AI STUDY is running on port ${PORT}`
    );


});