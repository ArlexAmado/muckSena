/* // js/profile.js

const session = JSON.parse(localStorage.getItem("session"));
let users = JSON.parse(localStorage.getItem("users")) || [];

// Validar sesión
if (!session || !session.loggedIn) {
  alert("Debes iniciar sesión.");
  window.location.href = "login.html";
}

// Mostrar el nombre en el perfil
const usernameSpan = document.getElementById("username");
if (usernameSpan) {
  usernameSpan.textContent = session.username;
}

const profileForm = document.getElementById("profileForm");
if (profileForm) {
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (newPassword) {
      users = users.map(user => {
        if (user.username === session.username) {
          return { ...user, password: newPassword };
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(users));
      alert("Contraseña actualizada.");
    } else {
      alert("No se hicieron cambios.");
    }

    document.getElementById("newPassword").value = "";
  });
}
 */