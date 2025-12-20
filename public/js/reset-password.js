document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('resetPasswordForm');
  const messageDiv = document.getElementById('resetMessage');
  const passwordInput = document.getElementById('newPassword');
  const toggleBtn = document.getElementById('togglePassword');
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');
  const submitBtn = document.getElementById('submitBtn');

  // Obtener el token de la URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    messageDiv.textContent = 'Token no válido o expirado.';
    messageDiv.className = 'message error';
    form.style.display = 'none';
    return;
  }

  // Toggle mostrar/ocultar contraseña
  toggleBtn.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    // Cambiar icono
    const eyeIcon = document.getElementById('eyeIcon');
    if (type === 'text') {
      eyeIcon.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
    } else {
      eyeIcon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
    }
  });

  // Validación de contraseña en tiempo real
  passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;

    // Requisitos
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    // Actualizar indicadores visuales
    updateRequirement('req-length', hasLength);
    updateRequirement('req-uppercase', hasUppercase);
    updateRequirement('req-lowercase', hasLowercase);
    updateRequirement('req-number', hasNumber);

    // Calcular fuerza de la contraseña
    let strength = 0;
    if (hasLength) strength++;
    if (hasUppercase) strength++;
    if (hasLowercase) strength++;
    if (hasNumber) strength++;
    if (password.length >= 12) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    // Actualizar barra de fuerza
    const percentage = (strength / 6) * 100;
    strengthFill.style.width = percentage + '%';

    if (strength <= 2) {
      strengthFill.style.background = '#fc8181';
      strengthText.textContent = 'Débil';
      strengthText.style.color = '#fc8181';
    } else if (strength <= 4) {
      strengthFill.style.background = '#f6ad55';
      strengthText.textContent = 'Media';
      strengthText.style.color = '#f6ad55';
    } else {
      strengthFill.style.background = '#48bb78';
      strengthText.textContent = 'Fuerte';
      strengthText.style.color = '#48bb78';
    }

    // Habilitar/deshabilitar botón
    const allValid = hasLength && hasUppercase && hasLowercase && hasNumber;
    submitBtn.disabled = !allValid;
  });

  function updateRequirement(id, isValid) {
    const element = document.getElementById(id);
    if (isValid) {
      element.classList.add('valid');
      element.classList.remove('invalid');
    } else {
      element.classList.add('invalid');
      element.classList.remove('valid');
    }
  }

  // Enviar formulario
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const newPassword = passwordInput.value;

    // Deshabilitar botón mientras se procesa
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        data = { message: await res.text() };
      }

      if (res.ok) {
        messageDiv.textContent = '✅ ¡Contraseña restablecida! Redirigiendo al inicio de sesión...';
        messageDiv.className = 'message success';
        form.style.display = 'none';

        // Redirigir después de 2 segundos
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      } else {
        messageDiv.textContent = '❌ ' + (data.message || 'Error al restablecer la contraseña.');
        messageDiv.className = 'message error';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Restablecer contraseña';
      }
    } catch (err) {
      console.error('Error de red al llamar a /api/reset-password:', err);
      messageDiv.textContent = '❌ Error de conexión con el servidor. Intenta de nuevo más tarde.';
      messageDiv.className = 'message error';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Restablecer contraseña';
    }
  });

  // Inicializar botón como deshabilitado
  submitBtn.disabled = true;
});