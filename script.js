let selectedSubject = "General Study";

let lastAnswer = "";


function setSubject(subject){

  selectedSubject = subject;

  document.getElementById("question").placeholder =
  "Ask your " + subject + " request...";

}





const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const chatArea = document.getElementById("chatArea");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");





function addMessage(text,type){

  const message = document.createElement("div");

  message.className = "message " + type;

  message.textContent = text;

  chatArea.appendChild(message);

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


questionInput.value="";


askBtn.disabled=true;

askBtn.textContent="Thinking...";



const thinking = document.createElement("div");

thinking.className="message ai";

thinking.textContent="🤖 DENIS GODSON AI is thinking...";

chatArea.appendChild(thinking);





let instruction = "";



if(selectedSubject === "Math"){

instruction =
"Solve this math problem step by step. Explain every step clearly.";

}


else if(selectedSubject === "Quiz Generator"){

instruction =
"Create a quiz about this topic. Include questions and answers.";

}


else if(selectedSubject === "Summarizer"){

instruction =
"Summarize this text into short, clear study notes.";

}


else if(selectedSubject === "Essay Writing"){

instruction =
"Help the student write a better essay. Give structure, ideas, and improvements.";

}


else{

instruction =
"Help the student understand this topic clearly.";

}





try{


const response = await fetch("/ask",{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

question:

`You are DENIS GODSON AI STUDY.

Task:
${instruction}

Student request:
${question}`

})


});




const data = await response.json();



thinking.remove();



lastAnswer = data.answer;



addMessage(
data.answer,
"ai"
);



}


catch(error){


thinking.remove();


addMessage(
"Unable to connect to AI.",
"ai"
);


}





askBtn.disabled=false;

askBtn.textContent="Ask AI";



});







clearBtn.addEventListener("click",()=>{


chatArea.innerHTML =

`
<div class="message ai">

🤖 Hello! I'm DENIS GODSON AI STUDY. Ask me anything.

</div>
`;

lastAnswer="";


});







copyBtn.addEventListener("click",()=>{


if(lastAnswer){

navigator.clipboard.writeText(lastAnswer);

alert("Answer copied!");

}

else{

alert("No answer available yet.");

}


});