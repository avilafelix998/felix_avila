// ! REALIZAR LA LÓGICA DE REGISTRO DE USUARIOS AQUÍ
import "./style.css";

document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

 
  if (!username || !email || !password) {
    displayMessage("Por favor, completa todos los campos.", "error");
    return;
  }

 
  try {
    const newUser = await registerUser({ username, email, password });
    displayMessage(`Registro exitoso, ${newUser.username}!`, "success");


    document.getElementById('register-form').reset();
  } catch (error) {
    displayMessage(error.message, "error");
  }
});

async function registerUser(userData) {
  const response = await fetch("http://localhost:4321/auth.routes.js/sign-up", { // Cambia la URL según tu API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el usuario.");
  }

  return await response.json(); 
}

function displayMessage(msg, type) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = msg;
  messageDiv.className = type === "error" ? "text-red-500" : "text-green-500";
  messageDiv.style.textAlign = "center";
  messageDiv.style.marginTop = "20px";

  
  const form = document.getElementById('register-form');
  form.appendChild(messageDiv);

 
}

  