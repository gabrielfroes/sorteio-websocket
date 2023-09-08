let socket;

function connectWebSocket() {
  socket = new WebSocket(WS_URL);

  socket.addEventListener("open", handleSocketOpen);
  socket.addEventListener("message", handleSocketMessage);
  socket.addEventListener("error", handleSocketError);
  socket.addEventListener("close", handleSocketClose);
}

function handleSocketOpen() {
  console.log("Websocket conectado.");
  socket.send(JSON.stringify({ action: ACTIONS.ADMIN }));
}

function handleSocketMessage(event) {
  const data = JSON.parse(event.data);

  if (data.action === ACTIONS.CLIENT_COUNT_UPDATE) {
    updateClientCount(data.count);
  }
}

function handleSocketError(error) {
  console.error("Erro no Websocket:", error);
}

function handleSocketClose() {
  console.log("Websocket fechado. Tentando reconectar em 5 segundos...");
  setTimeout(connectWebSocket(), 5000);
}

function updateClientCount(count) {
  document.getElementById("clientCount").innerText = count;
}

function generateCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

connectWebSocket();

const drawButton = document.getElementById("draw");
const messageDiv = document.getElementById("message");

drawButton.addEventListener("click", handleDrawClick);

function handleDrawClick() {
  const confirmationCode = generateCode(4);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        action: ACTIONS.DRAW,
        code: confirmationCode,
      })
    );
    displayConfirmationCode(confirmationCode);
  } else {
    console.warn(
      "Websocket não está aberto. Aguarde e tente novamente em instantes."
    );
  }
}

function displayConfirmationCode(code) {
  messageDiv.innerText = code;
  messageDiv.classList.remove("hide-message");
  messageDiv.classList.add("show-message");
  drawButton.innerText = "Sorteado!";
}
