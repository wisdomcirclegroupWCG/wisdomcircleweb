function toggleChat() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
}

function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  const chat = document.getElementById("chatMessages");

  if (!message) return;

  // Add user's message
  addMessage(message, "user");

  // Clear input
  input.value = "";

  // Add typing placeholder
  const typing = addMessage("🤖 Typing...", "bot", true);

  try {
    const response = await fetch("https://your-backend-url.com/ask", { // 🔁 REPLACE with your hosted backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();

    // Remove typing placeholder
    typing.remove();

    if (data.answer) {
      addMessage(data.answer, "bot");
    } else {
      addMessage("⚠️ No response received.", "bot");
    }
  } catch (err) {
    console.error("AI Error:", err);
    typing.remove();
    addMessage("🚨 Failed to fetch response. Please try again later.", "bot");
  }
}

function addMessage(text, sender, isTyping = false) {
  const chat = document.getElementById("chatMessages");
  const msg = document.createElement("div");

  msg.textContent = text;
  msg.className = sender === "user" ? "user-message" : "bot-message";

  if (isTyping) {
    msg.style.opacity = "0.6";
    msg.style.fontStyle = "italic";
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  return msg;
}
