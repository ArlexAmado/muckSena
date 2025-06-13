document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const usernameSpan = document.getElementById('username');
  const loginLogoutBtn = document.getElementById('loginLogoutBtn');
  const profileOption = document.getElementById('profileOption');
  const registerBtn = document.getElementById('registerBtn');
  const registerBtnDropdown = document.getElementById('registerBtnDropdown');
  const loginBtnFromRegister = document.getElementById('loginBtnFromRegister');
  const loginContainer = document.getElementById('login-container');
  const registerContainer = document.getElementById('register-container');

  // Estado de autenticación
  function isLoggedIn() {
    const session = JSON.parse(localStorage.getItem("session"));
    return session && session.loggedIn;
  }

  function getUsername() {
    const session = JSON.parse(localStorage.getItem("session"));
    return (session && session.username) || 'Invitado';
  }

  // Actualiza la UI según el estado de sesión
  function updateUserUI() {
    if (usernameSpan) usernameSpan.textContent = getUsername();
    if (isLoggedIn()) {
      if (loginLogoutBtn) loginLogoutBtn.textContent = 'Cerrar sesión';
      if (profileOption) profileOption.style.display = 'block';
      if (registerBtn) registerBtn.style.display = 'none';
      if (registerBtnDropdown) registerBtnDropdown.style.display = 'none';
    } else {
      if (loginLogoutBtn) loginLogoutBtn.textContent = 'Iniciar sesión';
      if (profileOption) profileOption.style.display = 'none';
      if (registerBtn) registerBtn.style.display = 'block';
      if (registerBtnDropdown) registerBtnDropdown.style.display = 'block';
    }
  }

  // Mostrar/Ocultar modales
  function showLoginModal() {
    if (loginContainer) loginContainer.style.display = 'flex';
    if (registerContainer) registerContainer.style.display = 'none';
  }
  function hideLoginModal() {
    if (loginContainer) loginContainer.style.display = 'none';
  }
  function showRegisterModal() {
    if (registerContainer) registerContainer.style.display = 'flex';
    if (loginContainer) loginContainer.style.display = 'none';
  }
  function hideRegisterModal() {
    if (registerContainer) registerContainer.style.display = 'none';
  }

  // Eventos de botones
  if (loginLogoutBtn) {
    loginLogoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (isLoggedIn()) {
        localStorage.removeItem('session');
        updateUserUI();
        window.location.href = 'dashboard.html';
      } else {
        showLoginModal();
      }
    });
  }
  if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showRegisterModal();
    });
  }
  if (registerBtnDropdown) {
    registerBtnDropdown.addEventListener('click', function(e) {
      e.preventDefault();
      showRegisterModal();
    });
  }
  if (loginBtnFromRegister) {
    loginBtnFromRegister.addEventListener('click', function(e) {
      e.preventDefault();
      showLoginModal();
    });
  }

  // Registro con backend
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('¡Usuario registrado! Ahora puedes iniciar sesión.');
        hideRegisterModal();
        registerForm.reset();
      } else {
        alert(data.message);
      }
    });
  }

  // Login con backend
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('usernameInput').value;
      const password = document.getElementById('passwordLogin').value;

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('session', JSON.stringify({
          loggedIn: true,
          username: data.username,
          email: data.email,
          token: data.token
        }));
        updateUserUI();
        hideLoginModal();
        loginForm.reset();
      } else {
        alert(data.message);
      }
    });
  }

  // Mostrar el modal de recuperación
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeForgotPassword = document.getElementById('closeForgotPassword');

  if (forgotPasswordLink && forgotPasswordModal) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      forgotPasswordModal.style.display = 'flex';
      if (loginContainer) loginContainer.style.display = 'none';
    });
  }
  if (closeForgotPassword && forgotPasswordModal) {
    closeForgotPassword.addEventListener('click', () => {
      forgotPasswordModal.style.display = 'none';
      if (loginContainer) loginContainer.style.display = 'flex';
    });
  }

  // Manejar el submit del formulario de recuperación
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('forgotPasswordEmail').value;
      try {
        const res = await fetch('http://localhost:3000/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
          alert('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
          forgotPasswordModal.style.display = 'none';
          if (loginContainer) loginContainer.style.display = 'flex';
        } else {
          alert(data.message || 'No se pudo enviar el correo de recuperación.');
        }
      } catch (err) {
        alert('Error de conexión con el servidor.');
      }
    });
  }

  // Mostrar/ocultar contraseña en el login
  const passwordLogin = document.getElementById('passwordLogin');
  const toggleLoginPassword = document.getElementById('toggleLoginPassword');
  if (passwordLogin && toggleLoginPassword) {
    toggleLoginPassword.addEventListener('click', () => {
      passwordLogin.type = passwordLogin.type === 'password' ? 'text' : 'password';
      toggleLoginPassword.textContent = passwordLogin.type === 'password' ? '👁️' : '🙈';
    });
  }
  // Mostrar/ocultar contraseña en el registro
  const registerPassword = document.getElementById('registerPassword');
  const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
  if (registerPassword && toggleRegisterPassword) {
    toggleRegisterPassword.addEventListener('click', () => {
      registerPassword.type = registerPassword.type === 'password' ? 'text' : 'password';
      toggleRegisterPassword.textContent = registerPassword.type === 'password' ? '👁️' : '🙈';
    });
  }

  // Cerrar modal si se hace click fuera del formulario
  if (loginContainer) {
    loginContainer.addEventListener('click', function(e) {
      if (e.target === loginContainer) hideLoginModal();
    });
  }
  if (registerContainer) {
    registerContainer.addEventListener('click', function(e) {
      if (e.target === registerContainer) hideRegisterModal();
    });
  }

  // Click en "Mi perfil"
  if (profileOption) {
    profileOption.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'profile.html';
    });
  }

  // Inicializar UI
  updateUserUI();
});