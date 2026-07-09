// =====================================
// DENIS GODSON AI STUDY V4
// SCRIPT.JS PART 1
// =====================================


let selectedSubject = "General Study";

let lastAnswer = "";


const askBtn = document.getElementById("askBtn");

const questionInput = document.getElementById("question");

const chatArea = document.getElementById("chatArea");

const clearBtn = document.getElementById("clearBtn");

const copyBtn = document.getElementById("copyBtn");



// ===========================
// SELECT SUBJECT / TOOL
// ===========================


function setSubject(subject){

    selectedSubject = subject;


    questionInput.placeholder =
    "Enter your " + subject + " topic or question...";


}



// ===========================
// ADD CHAT MESSAGE
// ===========================


function addMessage(text, type){


    const message = document.createElement("div");


    message.className =
    "message " + type;


    message.textContent = text;


    chatArea.appendChild(message);


    chatArea.scrollTop =
    chatArea.scrollHeight;


}



// ===========================
// ASK AI
// ===========================


askBtn.addEventListener("click", async ()=>{


    const question =
    questionInput.value.trim();



    if(question === ""){


        addMessage(
        "Please enter a question first.",
        "ai"
        );


        return;

    }



    addMessage(question,"user");


    questionInput.value = "";



    askBtn.disabled = true;

    askBtn.textContent =
    "Thinking...";



    const loadingMessage =
    document.createElement("div");


    loadingMessage.className =
    "message ai";


    loadingMessage.textContent =
    "🤖 DENIS GODSON AI STUDY is thinking...";


    chatArea.appendChild(loadingMessage);



    let instruction = "";



    switch(selectedSubject){


        case "Math":

            instruction =
            "Solve this mathematics question step by step and explain clearly.";

        break;



        case "Science":

            instruction =
            "Explain this science topic in simple student-friendly language.";

        break;



        case "Essay Writing":

            instruction =
            "Help the student improve this essay with structure and ideas.";

        break;



        case "Quiz Generator":

            instruction =
            "Generate a quiz with questions and answers for this topic.";

        break;



        case "Flashcard Generator":

            instruction =
            "Create study flashcards. Use this format:\n\nFront: Question\nBack: Answer";

        break;



        case "Summarizer":

            instruction =
            "Summarize this information into short study notes.";

        break;



        default:

            instruction =
            "Answer as a helpful AI tutor.";

    }
    // ===========================
// SEND REQUEST TO SERVER
// ===========================


try{


    const response = await fetch("/ask",{


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify({


            question:

`You are DENIS GODSON AI STUDY.

Study mode:
${selectedSubject}

Instruction:
${instruction}

Student question:
${question}`


        })


    });



    const data =
    await response.json();



    loadingMessage.remove();



    lastAnswer =
    data.answer;



    addMessage(

        data.answer || "No answer received.",

        "ai"

    );



}


catch(error){


    loadingMessage.remove();



    addMessage(

    "❌ Unable to connect to AI. Please try again.",

    "ai"

    );


    console.error(error);


}



askBtn.disabled = false;


askBtn.textContent =
"Ask AI";


});



// ===========================
// CLEAR CHAT
// ===========================


clearBtn.addEventListener("click", ()=>{


    chatArea.innerHTML = `


    <div class="message ai">


    🤖 Welcome to DENIS GODSON AI STUDY!


    Select a tool and ask your question.


    </div>


    `;


    lastAnswer = "";


});



// ===========================
// COPY ANSWER
// ===========================


copyBtn.addEventListener("click", ()=>{


    if(lastAnswer === ""){


        alert("No answer available yet.");

        return;

    }



    navigator.clipboard.writeText(lastAnswer);



    alert("✅ Answer copied!");



});



// ===========================
// ENTER KEY TO SEND
// ===========================


questionInput.addEventListener("keydown",(event)=>{


    if(event.key === "Enter" && !event.shiftKey){


        event.preventDefault();


        askBtn.click();


    }


});