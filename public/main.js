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

socket.on("clients-total", (data) => {
  clientTotal.innerText = `Total clients: ${data}`;
});

const sendMessage = () => {
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("send-message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
};

socket.on("chat-message", (data) => {
  addMessageToUI(false, data);
});

const addMessageToUI = (isOwnMessage, data) => {
  const messageElement = `
  <li class="${isOwnMessage ? "message-right" : "message-left"}">
    <p class="message">
        ${data.message}
        <span>${data.name} &#xb7; ${moment(data.dateTime).fromNow()}</span>
    </p>
  </li>
  `;

  messageContainer.innerHTML += messageElement;
};
