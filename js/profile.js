// js/profile.js

const session = JSON.parse(localStorage.getItem("session"));
const user = JSON.parse(localStorage.getItem("user"));

if (!session || !session.loggedIn) {
  alert("Debes iniciar sesión para ver tu perfil.");
  window.location.href = "index.html";
} else {
  document.getElementById("profileUsername").value = session.username;
}

const profileForm = document.getElementById("profileForm");
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newPassword = document.getElementById("newPassword").value;

  if (newPassword.trim() !== "") {
    const updatedUser = {
      username: user.username,
      password: newPassword
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Contraseña actualizada correctamente.");
  } else {
    alert("No se realizaron cambios.");
  }

  document.getElementById("newPassword").value = "";
});
