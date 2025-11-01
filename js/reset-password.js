document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('resetPasswordForm');
  const messageDiv = document.getElementById('resetMessage');

  // Obtener el token de la URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    messageDiv.textContent = 'Token no válido.';
    form.style.display = 'none';
    return;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;

    try {
      // Apuntar al backend (puerto 3000) en lugar del servidor estático del frontend
      const res = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      // Manejar respuestas que no devuelven JSON
      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        data = { message: await res.text() };
      }

      if (res.ok) {
        messageDiv.textContent = '¡Contraseña restablecida! Ahora puedes iniciar sesión.';
        form.style.display = 'none';
      } else {
        messageDiv.textContent = data.message || 'Error al restablecer la contraseña.';
      }
    } catch (err) {
      console.error('Error de red al llamar a /api/reset-password:', err);
      messageDiv.textContent = 'Error de conexión con el servidor. Intenta de nuevo más tarde.';
    }
  });
});