// js/auth.js

// Guardar usuario nuevo
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Usuario registrado con éxito.");
    window.location.href = "index.html";
  });
}

// Iniciar sesión
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.username === username && savedUser.password === password) {
      alert("Bienvenido " + username);
      localStorage.setItem("session", JSON.stringify({ loggedIn: true, username }));
      window.location.href = "dashboard.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
}
