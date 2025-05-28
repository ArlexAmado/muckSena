// js/register.js
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    alert("Debes completar todos los campos.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const existe = users.some(user => user.username === username);
  if (existe) {
    alert("El nombre de usuario ya existe.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
});
