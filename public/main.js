const socket = io();

const clientTotal = document.getElementById("clients-total");

socket.on("clients-total", (data) => {
  clientTotal.innerText = `Total clients: ${data}`;
});
