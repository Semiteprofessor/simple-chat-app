const socket = io();

const clientTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
});

const sendMessage = () => {
    const message = messageInput.value;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit("send-message", message);
};

socket.on("clients-total", (data) => {
  clientTotal.innerText = `Total clients: ${data}`;
});
