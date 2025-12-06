// js/login.js
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password }) // El backend espera 'email', ajusta si es necesario
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar sesión real del backend
      const session = {
        username: data.username,
        email: data.email,
        token: data.token,
        loggedIn: true
      };
      localStorage.setItem("session", JSON.stringify(session));

      alert("Inicio de sesión exitoso.");
      window.location.href = "home.html";
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Error de conexión con el servidor");
  }
});
