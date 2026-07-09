// ==============================
// DENIS GODSON AI STUDY V3
// ==============================

let selectedSubject = "General Study";
let lastAnswer = "";

// ------------------------------
// Select Study Mode
// ------------------------------

function setSubject(subject) {

    selectedSubject = subject;

    document.getElementById("question").placeholder =
        "Ask your " + subject + " question...";

}

// ------------------------------
// Elements
// ------------------------------

const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const chatArea = document.getElementById("chatArea");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

// ------------------------------
// Add Chat Message
// ------------------------------

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message " + type;

    message.textContent = text;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;

}

// ------------------------------
// Ask AI
// ------------------------------

askBtn.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if (!question) {

        addMessage("Please enter a question.", "ai");
        return;

    }

    addMessage(question, "user");

    questionInput.value = "";

    askBtn.disabled = true;
    askBtn.textContent = "Thinking...";

    const thinking = document.createElement("div");

    thinking.className = "message ai";
    thinking.textContent = "🤖 DENIS GODSON AI STUDY is thinking...";

    chatArea.appendChild(thinking);

    let instruction = "";

    switch (selectedSubject) {

        case "Math":
            instruction =
                "Solve this math problem step by step with explanations.";
            break;

        case "Science":
            instruction =
                "Explain this science topic simply for a student.";
            break;

        case "Essay Writing":
            instruction =
                "Help improve the student's essay with structure and better writing.";
            break;

        case "Quiz Generator":
            instruction =
                "Create 10 quiz questions with answers from the student's topic.";
            break;

        case "Summarizer":
            instruction =
                "Summarize the student's notes into simple study points.";
            break;

        default:
            instruction =
                "Answer clearly like a friendly AI tutor.";

    }

    try {

        const response = await fetch("/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                question:
`You are DENIS GODSON AI STUDY.

${instruction}

Student request:
${question}`

            })

        });

        const data = await response.json();

        thinking.remove();

        lastAnswer = data.answer;

        addMessage(data.answer, "ai");

    }

    catch (error) {

        thinking.remove();

        addMessage(
            "❌ Unable to connect to the AI server.",
            "ai"
        );

    }

    askBtn.disabled = false;

    askBtn.textContent = "Ask AI";

});

// ------------------------------
// Copy Answer
// ------------------------------

copyBtn.addEventListener("click", () => {

    if (!lastAnswer) {

        alert("No answer available yet.");

        return;

    }

    navigator.clipboard.writeText(lastAnswer);

    alert("✅ Answer copied!");

});

// ------------------------------
// Clear Chat
// ------------------------------

clearBtn.addEventListener("click", () => {

    chatArea.innerHTML = `

<div class="message ai">

🤖 Hello! I'm DENIS GODSON AI STUDY.

How can I help you today?

</div>

`;

    lastAnswer = "";

});

// ------------------------------
// Press Enter to Ask
// ------------------------------

questionInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        askBtn.click();

    }

});