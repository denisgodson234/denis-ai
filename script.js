// =====================================
// DENIS GODSON AI STUDY VERSION 6 CLEAN
// SCRIPT.JS PART 1
// =====================================



let lastAnswer = "";

let uploadedNotes = "";







// ===========================
// ELEMENTS
// ===========================


const askBtn = document.getElementById("askBtn");


const questionInput = document.getElementById("question");


const chatArea = document.getElementById("chatArea");


const clearBtn = document.getElementById("clearBtn");


const copyBtn = document.getElementById("copyBtn");


const noteFile = document.getElementById("noteFile");


const notesResult = document.getElementById("notesResult");








// ===========================
// ADD CHAT MESSAGE
// ===========================


function addMessage(text,type){



    if(!chatArea) return;



    const message = document.createElement("div");



    message.className =

    "message " + type;



    message.textContent = text;



    chatArea.appendChild(message);



    chatArea.scrollTop = chatArea.scrollHeight;


}
// ===========================
// NOTES FILE UPLOAD
// ===========================


if(noteFile){


noteFile.addEventListener("change",()=>{



    const file = noteFile.files[0];



    if(!file){

        return;

    }





    const reader = new FileReader();





    reader.onload = function(event){



        uploadedNotes = event.target.result;





        notesResult.innerHTML =

        "✅ Notes uploaded successfully.<br><br>" +

        file.name;



    };





    reader.readAsText(file);



});



}







// ===========================
// ANALYZE NOTES
// ===========================


async function analyzeNotes(type){



    if(uploadedNotes === ""){



        notesResult.innerHTML =

        "⚠️ Please upload your notes first.";



        return;



    }







    notesResult.innerHTML =

    "🤖 AI is analyzing your notes...";







    let task = "";






    if(type === "summary"){


        task =

        "Summarize these notes into simple important points.";


    }






    if(type === "quiz"){


        task =

        "Create a quiz from these notes with answers.";


    }






    if(type === "flashcards"){


        task =

        "Create useful flashcards from these notes.";


    }







    try{



        const response = await fetch("/ask",{



            method:"POST",



            headers:{


                "Content-Type":"application/json"


            },



            body:JSON.stringify({


                question:

`
You are DENIS GODSON AI STUDY.

${task}


Study Notes:

${uploadedNotes}

`


            })



        });








        const data = await response.json();






        notesResult.innerHTML =

        data.answer;







    }




    catch(error){



        console.log(error);



        notesResult.innerHTML =

        "❌ Unable to analyze notes. Please try again.";



    }





}
// ===========================
// ASK AI FUNCTION
// ===========================


if(askBtn){



askBtn.addEventListener("click", async ()=>{



    const question = questionInput.value.trim();




    if(question === ""){



        addMessage(

        "⚠️ Please enter a question.",

        "ai"

        );

        return;


    }






    addMessage(question,"user");



    questionInput.value = "";



    askBtn.disabled = true;



    askBtn.textContent = "Thinking...";






    const loading = document.createElement("div");



    loading.className = "message ai";



    loading.innerHTML = `

    🤖 AI is thinking

    <div class="ai-loading">

    <span></span>

    <span></span>

    <span></span>

    </div>

    `;



    chatArea.appendChild(loading);








    try{



        const response = await fetch("/ask",{



            method:"POST",



            headers:{


                "Content-Type":"application/json"


            },



            body:JSON.stringify({


                question:

`
You are DENIS GODSON AI STUDY.

Help the student learn clearly.

Student Question:

${question}

`

            })



        });








        const data = await response.json();





        loading.remove();





        lastAnswer = data.answer;






        addMessage(

        data.answer,

        "ai"

        );





    }





    catch(error){



        loading.remove();



        addMessage(

        "❌ AI connection error. Try again.",

        "ai"

        );



        console.log(error);



    }






    askBtn.disabled = false;



    askBtn.textContent = "Ask AI";



});



}







// ===========================
// CLEAR CHAT
// ===========================


if(clearBtn){



clearBtn.addEventListener("click",()=>{



    chatArea.innerHTML = `


    <div class="message ai">

    🤖 Hello! I am your AI study assistant. Ask me anything.

    </div>


    `;



    lastAnswer = "";



});



}







// ===========================
// COPY ANSWER
// ===========================


if(copyBtn){



copyBtn.addEventListener("click",()=>{



    if(lastAnswer === ""){


        alert("No AI answer available.");

        return;


    }






    navigator.clipboard.writeText(lastAnswer);



    alert("✅ Answer copied!");



});



}