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
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p><strong>${data.name}:</strong> ${
    data.message
  }</p><p>${data.dateTime.toLocaleString()}</p>`;
  messageContainer.appendChild(div);
});
