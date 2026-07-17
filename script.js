// ==========================================
// DENIS GODSON AI STUDY
// VERSION 6.2 PREMIUM FIXED
// PART 1
// ==========================================

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
// ADD MESSAGE
// ===========================

function addMessage(text, type) {

    if (!chatArea) return;

    const message = document.createElement("div");

    message.className = "message " + type;

    message.textContent = text;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}

// ===========================
// SHOW LOADING
// ===========================

function showLoading() {

    const loading = document.createElement("div");

    loading.id = "loadingMessage";

    loading.className = "message ai";

    loading.innerHTML = `
🤖 AI is thinking...

<div class="ai-loading">
<span></span>
<span></span>
<span></span>
</div>
`;

    chatArea.appendChild(loading);

    chatArea.scrollTop = chatArea.scrollHeight;
}

function hideLoading() {

    const loading = document.getElementById("loadingMessage");

    if (loading) {

        loading.remove();

    }

}
// ===========================
// ASK AI
// ===========================

if (askBtn) {

    askBtn.addEventListener("click", async () => {

        const question = questionInput.value.trim();

        if (question === "") {

            addMessage("⚠️ Please enter a question.", "ai");
            return;

        }

        addMessage(question, "user");

        questionInput.value = "";

        askBtn.disabled = true;

        showLoading();

        try {

            const response = await fetch("/ask", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    question: question

                })

            });

            hideLoading();

            if (!response.ok) {

                throw new Error("Server Error");

            }

            const data = await response.json();

            lastAnswer = data.answer;

            addMessage(data.answer, "ai");

        } catch (error) {

            hideLoading();

            console.error(error);

            addMessage(
                "❌ Unable to contact the AI server. Please try again.",
                "ai"
            );

        }

        askBtn.disabled = false;

    });

}

// ===========================
// PRESS ENTER TO ASK
// ===========================

if (questionInput) {

    questionInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            askBtn.click();

        }

    });

}
// ===========================
// NOTES UPLOAD
// ===========================

if (noteFile) {

    noteFile.addEventListener("change", () => {

        const file = noteFile.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {

            uploadedNotes = e.target.result;

            if (notesResult) {

                notesResult.innerHTML =
                    "✅ <strong>" + file.name + "</strong> uploaded successfully.";

            }

        };

        reader.readAsText(file);

    });

}

// ===========================
// ANALYZE NOTES
// ===========================

async function analyzeNotes(type) {

    if (!uploadedNotes) {

        notesResult.innerHTML =
            "⚠️ Please upload a text (.txt) file first.";

        return;

    }

    notesResult.innerHTML = "🤖 AI is analyzing your notes...";

    let prompt = "";

    switch(type){

        case "summary":
            prompt = "Summarize these study notes:\n\n";
            break;

        case "quiz":
            prompt = "Create a quiz with answers from these notes:\n\n";
            break;

        case "flashcards":
            prompt = "Create flashcards from these notes:\n\n";
            break;

        default:
            prompt = "";
    }

    try{

        const response = await fetch("/ask",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                question: prompt + uploadedNotes

            })

        });

        const data = await response.json();

        notesResult.innerHTML = data.answer;

    }
    catch(err){

        console.error(err);

        notesResult.innerHTML =
        "❌ Unable to analyze notes.";

    }

}

// ===========================
// CLEAR CHAT
// ===========================

if(clearBtn){

clearBtn.addEventListener("click",()=>{

chatArea.innerHTML="";

lastAnswer="";

});

}

// ===========================
// COPY ANSWER
// ===========================

if(copyBtn){

copyBtn.addEventListener("click",async()=>{

if(!lastAnswer){

alert("No AI answer available.");

return;

}

try{

await navigator.clipboard.writeText(lastAnswer);

alert("✅ Answer copied!");

}
catch{

alert("Copy failed.");

}

});

}

// ===========================
// PREMIUM SCROLL ANIMATION
// ===========================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(
".premium-section,.premium-card,.chat-card,.card"
).forEach(el=>{

el.classList.add("fade-in");

observer.observe(el);

});

// ===========================
// BACK TO TOP
// ===========================

const topButton=document.createElement("button");

topButton.id="topButton";

topButton.innerHTML="⬆";

document.body.appendChild(topButton);

Object.assign(topButton.style,{
position:"fixed",
right:"20px",
bottom:"20px",
width:"50px",
height:"50px",
borderRadius:"50%",
border:"none",
cursor:"pointer",
display:"none",
fontSize:"20px",
background:"linear-gradient(135deg,#2563eb,#10b981)",
color:"#fff",
zIndex:"9999"
});

window.addEventListener("scroll",()=>{

topButton.style.display=
window.scrollY>300?"block":"none";

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

console.log("🚀 Version 6.2 Premium Fixed Loaded");