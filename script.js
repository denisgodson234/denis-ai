// ==========================================
// DENIS GODSON AI STUDY
// VERSION 6.2 PREMIUM
// SCRIPT.JS PART 1
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

function addMessage(text, type){

    const message = document.createElement("div");

    message.className = "message " + type;

    message.textContent = text;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;

}

// ===========================
// SCROLL ANIMATION
// ===========================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
".premium-section,.card,.premium-card,.chat-card"
).forEach(item=>{

    item.classList.add("fade-in");

    observer.observe(item);

});

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(
this.clientWidth,
this.clientHeight
);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=
e.offsetX-size/2+"px";

ripple.style.top=
e.offsetY-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});
// ===========================
// ENTER KEY SUPPORT
// ===========================

if(questionInput){

questionInput.addEventListener("keydown",function(e){

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

askBtn.click();

}

});

}

// ===========================
// LOADING ANIMATION
// ===========================

function showLoading(){

const loading=document.createElement("div");

loading.id="loadingMessage";

loading.className="message ai";

loading.innerHTML=`

🤖 <strong>AI is thinking...</strong>

<div class="ai-loading">

<span></span>
<span></span>
<span></span>

</div>

`;

chatArea.appendChild(loading);

chatArea.scrollTop=chatArea.scrollHeight;

}

function hideLoading(){

const loading=document.getElementById("loadingMessage");

if(loading){

loading.remove();

}

}

// ===========================
// UPDATE ASK BUTTON
// ===========================

if(askBtn){

const originalClick=askBtn.onclick;

askBtn.addEventListener("click",()=>{

showLoading();

setTimeout(hideLoading,800);

});

}

// ===========================
// WELCOME MESSAGE
// ===========================

window.addEventListener("load",()=>{

console.log("🚀 DENIS GODSON AI STUDY Version 6.2 Premium Loaded");

});

// ===========================
// BACK TO TOP BUTTON
// ===========================

const topButton=document.createElement("button");

topButton.innerHTML="⬆";

topButton.id="topButton";

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

fontWeight:"bold",

background:"linear-gradient(135deg,#2563eb,#10b981)",

color:"#fff",

boxShadow:"0 8px 20px rgba(0,0,0,.3)",

zIndex:"999"

});

window.addEventListener("scroll",()=>{

topButton.style.display=

window.scrollY>300?"block":"none";

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});