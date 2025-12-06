// js/register.js
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    alert("Debes completar todos los campos.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email: username, password }) // Asumiendo que el username del form es el email
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Error al registrarse");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Error de conexión con el servidor");
  }
});
