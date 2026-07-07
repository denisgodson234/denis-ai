const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  if (!question) {
    answerBox.textContent = "Please enter a question.";
    return;
  }

  askBtn.disabled = true;
  askBtn.textContent = "Thinking...";
  answerBox.textContent = "Getting your answer...";

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      answerBox.textContent = data.answer || "An error occurred.";
    } else {
      answerBox.textContent = data.answer;
    }

  } catch (error) {
    answerBox.textContent = "Unable to connect to the AI server.";
  }

  askBtn.disabled = false;
  askBtn.textContent = "Ask AI";
});