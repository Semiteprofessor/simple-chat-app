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
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("send-message", data);
  messageInput.value = "";
  messageContainer.scrollTop = messageContainer.scrollHeight;
  nameInput.focus();
  nameInput.disabled = true;
  setTimeout(() => {
    nameInput.disabled = false;
    nameInput.focus();
  }, 3000);
  nameInput.blur();
  messageInput.blur();
  return false;
};

socket.on("clients-total", (data) => {
  clientTotal.innerText = `Total clients: ${data}`;
});

socket.on("chat-message", (data) => {
  addMessagetoUI();
});

const addMessagetoUI = () => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <strong>${data.name}:</strong> ${data.message}
    <span class="timestamp">${data.dateTime.toLocaleTimeString()}</span>
    `;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
};
