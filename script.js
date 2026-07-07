let selectedSubject = "General Study";


function setSubject(subject) {

  selectedSubject = subject;

  document.getElementById("question").placeholder =
    "Ask your " + subject + " question...";

}



const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");


askBtn.addEventListener("click", async () => {


  const question = questionInput.value.trim();


  if (!question) {

    answerBox.textContent =
      "Please enter a question.";

    return;

  }



  askBtn.disabled = true;

  askBtn.textContent = "Thinking...";


  answerBox.textContent =
    "🤖 DENIS AI is preparing your answer...";



  try {


    const response = await fetch("/ask", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },


      body: JSON.stringify({

        question:
        `Subject: ${selectedSubject}

Student question:
${question}`

      })

    });



    const data = await response.json();



    if (response.ok) {

      answerBox.textContent =
        data.answer;

    } else {

      answerBox.textContent =
        "Error: " + data.answer;

    }



  } catch (error) {


    answerBox.textContent =
      "Unable to connect to DENIS AI.";


  }



  askBtn.disabled = false;

  askBtn.textContent = "Ask AI";


});