// =====================================
// DENIS GODSON AI STUDY VERSION 6
// SCRIPT.JS PART 1
// =====================================



let selectedSubject = "General Study";


let selectedMode = "Teacher Mode";


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
// SUBJECT SELECTION
// ===========================


function setSubject(subject){


    selectedSubject = subject;


    if(questionInput){


        questionInput.placeholder =

        "Ask your " + subject + " question...";


    }


}






// ===========================
// AI MODE SELECTION
// ===========================


function setMode(mode){


    selectedMode = mode;



    addMessage(

    "✅ Learning mode changed to: " + mode,

    "ai"

    );


}






// ===========================
// CHAT MESSAGE DISPLAY
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
// AI TEACHING STYLE
// ===========================


function getModeInstruction(){



    if(selectedMode === "Teacher Mode"){


        return "Explain clearly like a patient teacher using simple examples.";


    }



    if(selectedMode === "Exam Mode"){


        return "Answer like an exam preparation tutor with important points.";


    }



    if(selectedMode === "Revision Mode"){


        return "Create summaries, key points and memory tips.";


    }



    if(selectedMode === "Creative Mode"){


        return "Use creative explanations and examples to help learning.";


    }



    return "Help the student learn effectively.";

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
// ANALYZE NOTES FUNCTION
// ===========================


async function analyzeNotes(type){



    if(uploadedNotes === ""){



        notesResult.innerHTML =

        "⚠️ Please upload your notes first.";



        return;



    }





    notesResult.innerHTML =

    "🤖 AI is analyzing your notes...";






    let request = "";





    if(type === "summary"){


        request =

        "Summarize these notes into simple important points.";


    }





    if(type === "quiz"){


        request =

        "Create a quiz from these notes with answers.";


    }





    if(type === "flashcards"){


        request =

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
You are DENIS GODSON AI STUDY Version 6.

Task:
${request}


Student Notes:

${uploadedNotes}

`


            })



        });








        const data = await response.json();





        notesResult.innerHTML =

        data.answer;





    }





    catch(error){



        notesResult.innerHTML =

        "❌ Unable to analyze notes. Try again.";



        console.log(error);



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

You are DENIS GODSON AI STUDY Version 6.

Learning Mode:
${selectedMode}


Subject:
${selectedSubject}


Instruction:
${getModeInstruction()}


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

        "❌ AI connection error.",

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

    🤖 Welcome to DENIS GODSON AI STUDY Version 6.

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


        alert("No answer available.");


        return;


    }





    navigator.clipboard.writeText(lastAnswer);



    alert("✅ Answer copied!");



});



}








// ===========================
// DASHBOARD COUNTERS
// =================