// js/login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const usuario = users.find(user => user.username === username && user.password === password);

  if (!usuario) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  // Guardar sesión activa
  const session = { username: usuario.username, loggedIn: true };
  localStorage.setItem("session", JSON.stringify(session));

  window.location.href = "dashboard.html";
  alert("Inicio de sesión exitoso.");
});
