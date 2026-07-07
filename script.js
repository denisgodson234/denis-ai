let selectedSubject = "General Study";


function setSubject(subject){

  selectedSubject = subject;

  document.getElementById("question").placeholder =
  "Ask your " + subject + " question...";

}



const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const chatArea = document.getElementById("chatArea");


function addMessage(message, type){

  const div = document.createElement("div");

  div.className = "message " + type;

  div.textContent = message;

  chatArea.appendChild(div);

  chatArea.scrollTop = chatArea.scrollHeight;

}



askBtn.addEventListener("click", async ()=>{


  const question = questionInput.value.trim();


  if(!question){

    addMessage(
      "Please enter a question.",
      "ai"
    );

    return;

  }



  addMessage(question,"user");


  questionInput.value = "";


  askBtn.disabled = true;

  askBtn.textContent = "Thinking...";


  addMessage(
    "🤖 DENIS AI is thinking...",
    "ai"
  );



  try{


    const response = await fetch("/ask",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        question:
        `Subject: ${selectedSubject}

Student question:
${question}`

      })

    });



    const data = await response.json();


    // Remove thinking message
    chatArea.lastChild.remove();


    addMessage(
      data.answer,
      "ai"
    );


  }catch(error){


    chatArea.lastChild.remove();


    addMessage(
      "Unable to connect to AI.",
      "ai"
    );


  }


  askBtn.disabled = false;

  askBtn.textContent = "Ask AI";


});