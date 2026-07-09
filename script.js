// =====================================
// DENIS GODSON AI STUDY V4
// PART 1
// =====================================

let selectedSubject = "General Study";
let lastAnswer = "";

const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const chatArea = document.getElementById("chatArea");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

// --------------------
// Select Study Tool
// --------------------

function setSubject(subject){

    selectedSubject = subject;

    questionInput.placeholder =
    "Enter your " + subject + " topic...";

}

// --------------------
// Chat Bubble
// --------------------

function addMessage(text,type){

    const message =
    document.createElement("div");

    message.className =
    "message " + type;

    message.textContent =
    text;

    chatArea.appendChild(message);

    chatArea.scrollTop =
    chatArea.scrollHeight;

}

// --------------------
// Ask AI
// --------------------

askBtn.addEventListener("click", async ()=>{

    const question =
    questionInput.value.trim();

    if(question===""){

        addMessage(
        "Please enter a question.",
        "ai"
        );

        return;

    }

    addMessage(question,"user");

    questionInput.value="";

    askBtn.disabled=true;

    askBtn.textContent="Thinking...";

    const thinking =
    document.createElement("div");

    thinking.className="message ai";

    thinking.textContent=
    "🤖 DENIS GODSON AI STUDY is thinking...";

    chatArea.appendChild(thinking);

    let instruction="";

    switch(selectedSubject){

        case "Math":

        instruction=
        "Solve this mathematics problem step by step.";

        break;

        case "Science":

        instruction=
        "Explain this science topic in simple language.";

        break;

        case "Essay Writing":

        instruction=
        "Help write and improve this essay.";

        break;

        case "Quiz Generator":

        instruction=
        "Create 10 quiz questions with answers.";

        break;

        case "Summarizer":

        instruction=
        "Summarize these notes into short study points.";

        break;

        case "Flashcard Generator":

        instruction=
        "Create 10 study flashcards. Format each as:\n\nFront: ...\nBack: ...";

        break;

        default:

        instruction=
        "Answer like a friendly AI tutor.";

    }

    try{

        const response =
        await fetch("/ask",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                question:

`You are DENIS GODSON AI STUDY.

${instruction}

Student request:

${question}`

            })

        });

        const data =
        await response.json();

        thinking.remove();

        lastAnswer =
        data.answer;

        addMessage(
        data.answer,
        "ai"
        );
    }

    catch(error){

        thinking.remove();

        addMessage(
        "❌ Unable to connect to the AI server. Please try again.",
        "ai"
        );

        console.error(error);

    }

    askBtn.disabled = false;

    askBtn.textContent = "Ask AI";

});

// --------------------
// Copy Answer
// --------------------

copyBtn.addEventListener("click", ()=>{

    if(lastAnswer===""){

        alert("No answer available yet.");

        return;

    }

    navigator.clipboard.writeText(lastAnswer);

    alert("✅ Answer copied!");

});

// --------------------
// Clear Chat
// --------------------

clearBtn.addEventListener("click", ()=>{

    chatArea.innerHTML =

    `
    <div class="message ai">

    🤖 Welcome to DENIS GODSON AI STUDY!

    Select a study tool above or ask me anything.

    </div>
    `;

    lastAnswer = "";

});

// --------------------
// Press Enter to Send
// --------------------

questionInput.addEventListener("keydown",(event)=>{

    if(event.key==="Enter" && !event.shiftKey){

        event.preventDefault();

        askBtn.click();

    }

});

// =====================================
// END OF SCRIPT
// =====================================