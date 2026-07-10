// =====================================
// DENIS GODSON AI STUDY VERSION 6
// SERVER.JS PART 1
// =====================================


const express = require("express");

const cors = require("cors");

const path = require("path");

const Groq = require("groq-sdk");




const app = express();





// ===========================
// MIDDLEWARE
// ===========================


app.use(cors());


app.use(express.json({limit:"5mb"}));


app.use(express.static(__dirname));






// ===========================
// GROQ AI CONNECTION
// ===========================


const client = new Groq({

    apiKey: process.env.GROQ_API_KEY

});

// ===========================
// AI REQUEST ROUTE
// ===========================


app.post("/ask", async (req,res)=>{


    try{


        const question = req.body.question;




        if(!question){


            return res.json({


                answer:

                "Please enter a question."


            });


        }







        const response = await client.chat.completions.create({



            model:

            "llama-3.3-70b-versatile",




            messages:[




                {


                role:"system",



                content:

`
You are DENIS GODSON AI STUDY Version 6.

You are a professional AI tutor.

Your job:
- Explain lessons clearly
- Help students prepare for exams
- Summarize notes
- Create quizzes
- Create flashcards
- Give examples
- Encourage learning

Always give simple, accurate, student-friendly answers.
`

                },





                {


                role:"user",



                content:question

                }



            ],




            temperature:0.7



        });







        const answer =

        response.choices[0].message.content;






        res.json({



            answer:answer



        });





    }





    catch(error){



        console.log("AI ERROR:",error);





        res.status(500).json({



            answer:

            "❌ AI service is temporarily unavailable. Please try again."



        });



    }



});

// ===========================
// HOMEPAGE ROUTE
// ===========================


app.get("/", (req,res)=>{


    res.sendFile(

        path.join(__dirname,"index.html")

    );


});







// ===========================
// HEALTH CHECK ROUTE
// ===========================


app.get("/health",(req,res)=>{


    res.json({

        status:"DENIS GODSON AI STUDY Version 6 is running 🚀"

    });


});







// ===========================
// SERVER START
// ===========================


const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{


    console.log(

    `🚀 DENIS GODSON AI STUDY Version 6 running on port ${PORT}`

    );


});