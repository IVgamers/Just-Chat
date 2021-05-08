var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("join_sound");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom : " + room;
  })

  socket.on("recieve", function(message){
    if (messages.length < 7){
      messages.push(message);
      dingSound.play();
    }
    else{
      messages.shift();
      messages.push(message);
      dingSound.play();
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#303030";
    }
  })
}

function Connect(){
  socket.emit("join", chatIDInput.value, usernameInput.value);
  if (document.getElementById("NameInput").value == ""){
    alert("You cannot join if you don't give yourself a name.")
  }
}

function send(){
  if (messageInput.value == ""){
    alert("You must type something before you can send a message.")
  }
  else {
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset(){
  delay = true;
}
document.addEventListener("keydown", function(your_event) {
  if (your_event.which == 13){
    if (document.getElementById("NameInput").value == ""){
      alert("You cannot join if you don't give yourself a name.")
    }
    else if (messageInput.value == ""){
      alert("You must type something before you can send a message.")
    }
    else {
      send()
    }
    your_event.preventDefault()
  }
})
function change_background(){
  document.getElementById("Main").style.backgroundColor = document.getElementById("bg").value;
}

var name = localStorage.getItem('name');
usernameInput.value = name; 
function save_name(){
  localStorage.setItem('name', usernameInput.value);
  alert("Name Saved!")
}
function old_name(){
  var name = localStorage.getItem('name');
  usernameInput.value = name; 
  localStorage.setItem('name', usernameInput.value);
}