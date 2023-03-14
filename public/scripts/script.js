// import { io } from "socket.io-client";
// const { io } = require("socket.io-client");
const socket = io();
const send=document.getElementById("send");
// const join=document.getElementById("join");
const messages=document.querySelector(".messages");
const textMessage=document.querySelector(".send-message-container input")
const MSG=document.getElementById("msg");

let ishidden=false;
MSG.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
    event.preventDefault();
      // Trigger the button element with a click
    send.click();
    }
})
// client-side
let name=prompt("enter your name");
// let name="ahmed"

while(!name){
    name=prompt("enter your name");
}
socket.on("connect", (name) => {
    // console.log(socket.id); 
});
socket.on("recieve-event", (MSG) => {
    // console.log(MSG);
    if(!ishidden){
        displayMessage(MSG.message.message,MSG.message.name,"");
        return ishidden=true;
    }
    displayMessage(MSG.message.message,"","");
});


send.addEventListener("click",function(){
    if(textMessage.value!=""){
        socket.emit("send-event",{ message: textMessage.value ,name:name});
        ishidden=false;
        displayMessage(textMessage.value,"","send");
        console.log("sending");
        textMessage.value="";

    }
})
function displayMessage(txt,name,style){
        messages.innerHTML+=messageDiv.replace("{text}",txt).replace("{style}",style).replace("{name}",name);
}


let messageDiv=`<div class="message {style}"><span class="name">{name}</span><div>{text}</div></div>`;