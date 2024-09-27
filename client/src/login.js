import "./style.css";

// Obtener el formulario de inicio de sesión
const $form = document.getElementById("login-form");


$form.addEventListener("submit", async (e) => {
  
  e.preventDefault();

  
  const formData = new FormData($form);

  
  const entries = Object.fromEntries(formData.entries());

  try {
   
    const response = await fetch("http://localhost:4321/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entries),
    });

    if (response.ok) {
      
      window.location.href = "/pages/home.html"; 
    } else {
     
      const errorMessage = await response.json();
      displayMessage(errorMessage.message || "Error en el inicio de sesión. Intenta de nuevo.", "error");
    }
  } catch (error) {
 
    displayMessage("Error en la conexión. Intenta de nuevo más tarde.", "error");
  }
});


function displayMessage(msg, type) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = msg;
  messageDiv.className = type === "error" ? "text-red-500" : "text-green-500";
  messageDiv.style.textAlign = "center";
  messageDiv.style.marginTop = "20px";


  $form.appendChild(messageDiv);

  
 
}
