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

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });

    const data = await res.json();
    if (res.ok) {
      messageDiv.textContent = '¡Contraseña restablecida! Ahora puedes iniciar sesión.';
      form.style.display = 'none';
    } else {
      messageDiv.textContent = data.message || 'Error al restablecer la contraseña.';
    }
  });
});