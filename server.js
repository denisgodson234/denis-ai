const express = require("express");

const cors = require("cors");

const path = require("path");

const Groq = require("groq-sdk");



const app = express();





app.use(cors());


app.use(express.json());



app.use(express.static(__dirname));





const client = new Groq({

    apiKey: process.env.GROQ_API_KEY

});






app.post("/ask", async (req,res)=>{


    try{


        const question = req.body.question;



        const response = await client.chat.completions.create({



            model:"llama-3.3-70b-versatile",



            messages:[



                {

                    role:"system",

                    content:

                    "You are DENIS GODSON AI STUDY, a helpful AI tutor that helps students learn clearly."

                },



                {

                    role:"user",

                    content:question

                }



            ]



        });





        res.json({


            answer:

            response.choices[0].message.content


        });





    }

    catch(error){



        console.log(error);



        res.status(500).json({


            answer:

            "AI service error. Please try again."


        });



    }



});

// ===========================
// WEBSITE ROUTE
// ===========================


app.get("/", (req,res)=>{


    res.sendFile(

        path.join(__dirname,"index.html")

    );


});





// ===========================
// SERVER START
// ===========================


const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{


    console.log(

        `🚀 DENIS GODSON AI STUDY Version 5 running on port ${PORT}`

    );


});