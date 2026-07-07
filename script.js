const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");


askBtn.addEventListener("click", async ()=>{

const question = questionInput.value.trim();


if(!question){

answerBox.textContent =
"Please enter a question.";

return;

}


answerBox.textContent =
"Thinking...";


try{


const response = await fetch("/ask",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
question:question
})

});


const data = await response.json();


answerBox.textContent =
data.answer;



}catch(error){


answerBox.textContent =
"Cannot connect to AI.";


}


});