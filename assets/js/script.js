// --- WHITEBOARD FUNCTIONALITY ---
const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

// Set canvas size manually to match CSS
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drawing = false;
let erasing = false;
let currentColor = document.getElementById("colorPicker").value;
let brushSize = document.getElementById("brushSize").value;

function getPointerPosition(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
}

function startDraw(e) {
  drawing = true;
  const { x, y } = getPointerPosition(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(e) {
  if (!drawing) return;
  const { x, y } = getPointerPosition(e);
  ctx.lineTo(x, y);
  ctx.strokeStyle = erasing ? "#ffffff" : currentColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.stroke();
}

function endDraw() {
  drawing = false;
  ctx.closePath();
}

// Event listeners
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseout", endDraw);

canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", endDraw);

// Toolbar functionality
document.getElementById("penButton").addEventListener("click", () => {
  erasing = false;
});

document.getElementById("eraserButton").addEventListener("click", () => {
  erasing = true;
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  currentColor = e.target.value;
});

document.getElementById("brushSize").addEventListener("input", (e) => {
  brushSize = e.target.value;
});

document.getElementById("clearButton").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
/*
// --- CHATBOT (EXAMPLE ONLY: add your actual logic here) ---
async function sendMessage() {
  const input = document.getElementById('userInput').value;
  if (!input.trim()) return;

  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `<div><strong>You:</strong> ${input}</div>`;
  document.getElementById('userInput').value = '';

  try {
    const response = await fetch("https://api.dify.ai/v1/chat-messages", {
      method: "POST",
      headers: {
        "Authorization": "app-1eC09EoCF1pRN60CD2hJ97Sz",  // Secure in production!
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_id: "cb0239f8-6e55-41ea-94ff-1a1349476194",
        inputs: {},
        query: input
      })
    });

    const data = await response.json();
    const reply = data.answer || "[No response]";
    messagesDiv.innerHTML += `<div><strong>Bot:</strong> ${reply}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  } catch (err) {
    messagesDiv.innerHTML += `<div><strong>Bot:</strong> Error fetching response.</div>`;
    console.error(err);
  }
}*/