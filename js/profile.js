document.addEventListener("DOMContentLoaded", async () => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (!session || !session.token) {
    alert("Debes iniciar sesión.");
    window.location.href = "dashboard.html";
    return;
  }

  // Obtener datos del perfil desde el backend
  try {
    const res = await fetch("http://localhost:3000/api/perfil", {
      headers: {
        "Authorization": "Bearer " + session.token
      }
    });
    if (!res.ok) {
      alert("No autorizado. Inicia sesión de nuevo.");
      window.location.href = "dashboard.html";
      return;
    }
    const data = await res.json();
    document.getElementById("profileUsername").value = data.username;
    document.getElementById("profileEmail").value = data.email;
  } catch (err) {
    alert("Error al obtener datos del perfil.");
  }

  // Cambiar contraseña
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const newPassword = document.getElementById("newPassword").value.trim();

      // Validar contraseña fuerte
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(newPassword)) {
        alert("La contraseña debe tener al menos 6 caracteres, una letra y un número.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/cambiar-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session.token
          },
          body: JSON.stringify({ newPassword })
        });
        const result = await res.json();
        if (res.ok) {
          alert("Contraseña actualizada correctamente.");
        } else {
          alert(result.message || "Error al actualizar la contraseña.");
        }
      } catch (err) {
        alert("Error al conectar con el servidor.");
      }

      document.getElementById("newPassword").value = "";
    });
  }
  // Mostrar/ocultar contraseña en el perfil
  const newPasswordInput = document.getElementById('newPassword');
  const togglePasswordBtn = document.getElementById('togglePassword');
  if (newPasswordInput && togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      newPasswordInput.type = newPasswordInput.type === 'password' ? 'text' : 'password';
      togglePasswordBtn.textContent = newPasswordInput.type === 'password' ? '👁️' : '🙈';
    });
  }
});

 