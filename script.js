// =====================================
// DENIS GODSON AI STUDY VERSION 5
// SCRIPT.JS PART 1
// =====================================


let selectedSubject = "General Study";


let selectedMode = "Teacher Mode";


let lastAnswer = "";




// ===========================
// ELEMENTS
// ===========================


const askBtn = document.getElementById("askBtn");


const questionInput = document.getElementById("question");


const chatArea = document.getElementById("chatArea");


const clearBtn = document.getElementById("clearBtn");


const copyBtn = document.getElementById("copyBtn");





// ===========================
// SELECT SUBJECT
// ===========================


function setSubject(subject){


    selectedSubject = subject;



    questionInput.placeholder =

    "Ask your " + subject + " question...";



}





// ===========================
// SELECT AI MODE
// ===========================


function setMode(mode){


    selectedMode = mode;



    addMessage(

    "✅ AI Mode changed to: " + mode,

    "ai"

    );


}





// ===========================
// ADD MESSAGE TO CHAT
// ===========================


function addMessage(text,type){



    const message = document.createElement("div");



    message.className =

    "message " + type;



    message.textContent = text;



    chatArea.appendChild(message);



    chatArea.scrollTop =

    chatArea.scrollHeight;



}






// ===========================
// GET MODE INSTRUCTION
// ===========================


function getModeInstruction(){



    switch(selectedMode){



        case "Teacher Mode":

            return "Explain like a patient teacher. Use simple examples.";



        case "Exam Mode":

            return "Act like an exam tutor. Give exam-style answers and important points.";



        case "Revision Mode":

            return "Help the student revise. Create summaries, key points and memory tips.";



        case "Creative Mode":

            return "Help with creative ideas, projects and better ways to understand topics.";



        default:

            return "Be a helpful AI study assistant.";


    }



}
// ===========================
// ASK AI FUNCTION
// ===========================


askBtn.addEventListener("click", async ()=>{


    const question = questionInput.value.trim();



    if(question === ""){


        addMessage(

        "⚠️ Please enter a question first.",

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


    loading.textContent =

    loading.innerHTML = `

🤖 AI is thinking

<div class="ai-loading">

<span></span>

<span></span>

<span></span>

</div>

`;

// ===========================
// PREMIUM DASHBOARD COUNTERS
// ===========================


const counters = document.querySelectorAll(".counter");



counters.forEach(counter => {


    counter.innerText = "0";



    const updateCounter = () => {



        const target = +counter.getAttribute("data-target");



        const current = +counter.innerText;



        const increment = target / 100;



        if(current < target){



            counter.innerText = Math.ceil(
                current + increment
            );



            setTimeout(updateCounter, 20);



        } else {



            counter.innerText = target.toLocaleString();



        }



    };



    updateCounter();



});



    chatArea.appendChild(loading);





    const instruction = getModeInstruction();





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

Learning Mode:
${selectedMode}

Subject:
${selectedSubject}

Instruction:
${instruction}

Student Question:
${question}
`


            })



        });







        const data = await response.json();





        loading.remove();





        lastAnswer = data.answer;





        addMessage(

        data.answer || "No answer received.",

        "ai"

        );




    }

    catch(error){



        loading.remove();




        addMessage(

        "❌ Connection error. Please try again.",

        "ai"

        );



        console.log(error);



    }





    askBtn.disabled = false;



    askBtn.textContent = "Ask AI";



});





// ===========================
// CLEAR CHAT
// ===========================


clearBtn.addEventListener("click", ()=>{



    chatArea.innerHTML = `

    <div class="message ai">

    🤖 Welcome back to DENIS GODSON AI STUDY Version 5.

    Choose a mode and start learning.

    </div>

    `;



    lastAnswer = "";



});






// ===========================
// COPY ANSWER
// ===========================


copyBtn.addEventListener("click", ()=>{



    if(lastAnswer === ""){


        alert("No answer to copy yet.");


        return;


    }





    navigator.clipboard.writeText(lastAnswer);



    alert("✅ Answer copied!");



});





// ===========================
// ENTER KEY SEND
// ===========================


questionInput.addEventListener("keydown",(event)=>{



    if(event.key === "Enter" && !event.shiftKey){



        event.preventDefault();



        askBtn.click();



    }



});