// Cargar información del usuario
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo();
  setupNavigation();
  setupEventListeners();
  loadPurchaseHistory();
  loadPaymentMethods();
  loadNotifications();
  loadMessages();
  loadWishlist();
  loadCredits();
});

async function loadUserInfo() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.loggedIn) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Actualizar información del usuario en la UI
  const userName = session.username || 'Usuario';
  const userEmail = session.email || 'email@example.com';

  document.getElementById('userName').textContent = userName;
  document.getElementById('sidebarUserName').textContent = userName;
  document.getElementById('sidebarUserEmail').textContent = userEmail;
  document.getElementById('profileUsername').value = userName;
  document.getElementById('profileEmail').value = userEmail;

  // Inicializar campos vacíos
  document.getElementById('profileBio').value = '';
  document.getElementById('profileWebsite').value = '';

  // Intentar obtener avatar desde el servidor
  try {
    const response = await fetch(`${API_URL}/profile/me`, {
      headers: {
        'Authorization': `Bearer ${session.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const avatarImg = document.getElementById('avatarImg');

      // Cargar avatar
      if (data.user.avatar) {
        // Usar avatar del servidor
        avatarImg.src = data.user.avatar;
        // Actualizar localStorage
        session.avatar = data.user.avatar;
        localStorage.setItem('session', JSON.stringify(session));
      } else if (session.avatar) {
        // Usar avatar de localStorage
        avatarImg.src = session.avatar;
      } else {
        // Usar UI Avatars por defecto
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=98ca3f&color=0f1419&size=100`;
        avatarImg.src = avatarUrl;
      }

      // Cargar biografía y sitio web
      if (data.user.bio) {
        document.getElementById('profileBio').value = data.user.bio;
      }
      if (data.user.website) {
        document.getElementById('profileWebsite').value = data.user.website;
      }
    } else {
      // Si falla, usar localStorage o UI Avatars
      const avatarImg = document.getElementById('avatarImg');
      if (session.avatar) {
        avatarImg.src = session.avatar;
      } else {
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=98ca3f&color=0f1419&size=100`;
        avatarImg.src = avatarUrl;
      }
    }
  } catch (error) {
    console.error('Error al cargar perfil:', error);
    // Usar localStorage o UI Avatars como fallback
    const avatarImg = document.getElementById('avatarImg');
    if (session.avatar) {
      avatarImg.src = session.avatar;
    } else {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=98ca3f&color=0f1419&size=100`;
      avatarImg.src = avatarUrl;
    }
  }
}

// Navegación entre secciones
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // Remover active de todos
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));

      // Agregar active al seleccionado
      item.classList.add('active');
      const sectionId = item.dataset.section;
      document.getElementById(sectionId).classList.add('active');
    });
  });
}

// Event Listeners
function setupEventListeners() {
  // Logout
  document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('session');
    window.location.href = 'dashboard.html';
  });

  // Editar perfil
  document.getElementById('editProfileBtn').addEventListener('click', enableEditMode);
  document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
  document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);

  // Cambiar contraseña
  document.getElementById('changePasswordBtn').addEventListener('click', changePassword);

  // Eliminar cuenta
  document.getElementById('deleteAccountBtn').addEventListener('click', deleteAccount);

  // Agregar método de pago
  document.getElementById('addPaymentBtn').addEventListener('click', addPaymentMethod);

  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);

      if (input.type === 'password') {
        input.type = 'text';
        this.textContent = '🙈';
      } else {
        input.type = 'password';
        this.textContent = '👁️';
      }
    });
  });

  // Cambiar avatar
  const avatarUpload = document.getElementById('avatarUpload');
  if (avatarUpload) {
    avatarUpload.addEventListener('change', handleAvatarUpload);
  }
}

// Manejar subida de avatar
async function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    showNotification('Por favor selecciona una imagen válida', 'error');
    return;
  }

  // Validar tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification('La imagen no debe superar 5MB', 'error');
    return;
  }

  // Comprimir y redimensionar la imagen
  const reader = new FileReader();
  reader.onload = async function (e) {
    const img = new Image();
    img.onload = async function () {
      // Crear canvas para redimensionar
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Redimensionar a máximo 400x400 manteniendo proporción
      let width = img.width;
      let height = img.height;
      const maxSize = 400;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a base64 con calidad reducida
      const imageData = canvas.toDataURL('image/jpeg', 0.8);

      // Actualizar la imagen en la UI inmediatamente
      document.getElementById('avatarImg').src = imageData;

      // Guardar en localStorage
      const session = JSON.parse(localStorage.getItem('session'));
      if (session) {
        session.avatar = imageData;
        localStorage.setItem('session', JSON.stringify(session));
      }

      // Intentar guardar en el servidor
      try {
        const response = await fetch(`${API_URL}/profile/avatar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
          },
          body: JSON.stringify({ avatar: imageData })
        });

        if (response.ok) {
          showNotification('Avatar actualizado exitosamente', 'success');
        } else {
          const errorData = await response.json();
          console.error('Error del servidor:', errorData);
          showNotification('Avatar guardado localmente', 'info');
        }
      } catch (error) {
        console.error('Error al guardar avatar:', error);
        showNotification('Avatar guardado localmente', 'info');
      }
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

// Editar perfil
function enableEditMode() {
  document.getElementById('profileUsername').disabled = false;
  document.getElementById('profileBio').disabled = false;
  document.getElementById('profileWebsite').disabled = false;
  document.getElementById('profileActions').style.display = 'flex';
  document.getElementById('editProfileBtn').style.display = 'none';
}

function cancelEdit() {
  document.getElementById('profileUsername').disabled = true;
  document.getElementById('profileBio').disabled = true;
  document.getElementById('profileWebsite').disabled = true;
  document.getElementById('profileActions').style.display = 'none';
  document.getElementById('editProfileBtn').style.display = 'block';
  loadUserInfo();
}

async function saveProfile() {
  const session = JSON.parse(localStorage.getItem('session'));
  const username = document.getElementById('profileUsername').value;
  const bio = document.getElementById('profileBio').value;
  const website = document.getElementById('profileWebsite').value;

  try {
    const response = await fetch(`${API_URL}/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify({ username, bio, website })
    });

    if (response.ok) {
      session.username = username;
      localStorage.setItem('session', JSON.stringify(session));
      showNotification('Perfil actualizado exitosamente', 'success');
      cancelEdit();
      loadUserInfo();
    } else {
      showNotification('Error al actualizar perfil', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error al conectar con el servidor', 'error');
  }
}

// Cambiar contraseña
async function changePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification('Por favor completa todos los campos', 'error');
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification('Las contraseñas no coinciden', 'error');
    return;
  }

  if (newPassword.length < 6) {
    showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
    return;
  }

  const session = JSON.parse(localStorage.getItem('session'));

  try {
    const response = await fetch(`${API_URL}/profile/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    if (response.ok) {
      showNotification('Contraseña actualizada exitosamente', 'success');
      document.getElementById('currentPassword').value = '';
      document.getElementById('newPassword').value = '';
      document.getElementById('confirmPassword').value = '';
    } else {
      const data = await response.json();
      showNotification(data.message || 'Error al cambiar contraseña', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error al conectar con el servidor', 'error');
  }
}

// Eliminar cuenta
function deleteAccount() {
  const confirmed = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');

  if (confirmed) {
    const doubleConfirm = confirm('Esta es tu última oportunidad. ¿Realmente deseas eliminar tu cuenta permanentemente?');

    if (doubleConfirm) {
      showNotification('Funcionalidad de eliminación de cuenta próximamente', 'info');
    }
  }
}

// Cargar historial de compras
async function loadPurchaseHistory() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.token) return;

  try {
    const response = await fetch(`${API_URL}/courses/my-courses`, {
      headers: {
        'Authorization': `Bearer ${session.token}`
      }
    });

    const data = await response.json();
    const courses = data.courses || [];

    const container = document.getElementById('purchaseHistory');

    if (courses.length === 0) {
      container.innerHTML = '<div class="empty-state"><h3>No tienes compras aún</h3><p>Explora nuestro catálogo de cursos</p></div>';
      return;
    }

    container.innerHTML = courses.map(course => `
      <div class="purchase-item">
        <div class="purchase-info">
          <h4>${course.title}</h4>
          <p>Comprado el ${new Date(course.purchasedAt).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}</p>
        </div>
        <div class="purchase-price">$${course.price?.toFixed(2) || '49.99'}</div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error al cargar historial:', error);
  }
}

// Cargar métodos de pago
function loadPaymentMethods() {
  const container = document.getElementById('paymentMethods');

  // Datos de ejemplo
  const methods = [
    { type: 'Visa', last4: '4242', expiry: '12/25', icon: '💳' },
    { type: 'Mastercard', last4: '8888', expiry: '06/26', icon: '💳' }
  ];

  if (methods.length === 0) {
    container.innerHTML = '<div class="empty-state"><h3>No tienes métodos de pago</h3><p>Agrega uno para realizar compras más rápido</p></div>';
    return;
  }

  container.innerHTML = methods.map(method => `
    <div class="payment-card">
      <div class="card-info">
        <span class="card-icon">${method.icon}</span>
        <div class="card-details">
          <h4>${method.type} •••• ${method.last4}</h4>
          <p>Expira ${method.expiry}</p>
        </div>
      </div>
      <button class="btn-danger" onclick="removePaymentMethod('${method.last4}')">Eliminar</button>
    </div>
  `).join('');
}

function addPaymentMethod() {
  showNotification('Funcionalidad de agregar método de pago próximamente', 'info');
}

function removePaymentMethod(last4) {
  if (confirm('¿Deseas eliminar este método de pago?')) {
    showNotification('Método de pago eliminado', 'success');
    loadPaymentMethods();
  }
}

// Cargar notificaciones
function loadNotifications() {
  const container = document.getElementById('notificationsList');

  const notifications = [
    {
      title: 'Nuevo curso disponible',
      message: 'Vue.js 3 - Curso Completo ya está disponible',
      time: 'Hace 2 horas',
      unread: true
    },
    {
      title: 'Certificado disponible',
      message: 'Tu certificado de JavaScript Moderno está listo',
      time: 'Hace 1 día',
      unread: false
    },
    {
      title: 'Oferta especial',
      message: '50% de descuento en cursos de diseño',
      time: 'Hace 3 días',
      unread: false
    }
  ];

  container.innerHTML = notifications.map(notif => `
    <div class="notification-item ${notif.unread ? 'unread' : ''}">
      <div class="notification-header">
        <h4>${notif.title}</h4>
        <span class="notification-time">${notif.time}</span>
      </div>
      <p>${notif.message}</p>
    </div>
  `).join('');
}

// Cargar mensajes
function loadMessages() {
  const container = document.getElementById('messagesList');

  const messages = [
    {
      sender: 'Soporte MuckSena',
      preview: 'Gracias por contactarnos. Tu consulta ha sido recibida...',
      time: 'Hace 1 hora'
    },
    {
      sender: 'Carlos Pérez',
      preview: 'Hola! Gracias por inscribirte en mi curso...',
      time: 'Hace 2 días'
    }
  ];

  if (messages.length === 0) {
    container.innerHTML = '<div class="empty-state"><h3>No tienes mensajes</h3></div>';
    return;
  }

  container.innerHTML = messages.map(msg => `
    <div class="message-item">
      <div class="message-header">
        <span class="message-sender">${msg.sender}</span>
        <span class="message-time">${msg.time}</span>
      </div>
      <p class="message-preview">${msg.preview}</p>
    </div>
  `).join('');
}

// Cargar lista de deseos
function loadWishlist() {
  const container = document.getElementById('wishlist');

  const wishlist = [
    {
      title: 'Python Avanzado',
      instructor: 'Ana García',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      price: 39.99
    },
    {
      title: 'Docker y Kubernetes',
      instructor: 'Roberto Díaz',
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop',
      price: 49.99
    }
  ];

  if (wishlist.length === 0) {
    container.innerHTML = '<div class="empty-state"><h3>Tu lista de deseos está vacía</h3><p>Agrega cursos que te interesen</p></div>';
    return;
  }

  container.innerHTML = wishlist.map(item => `
    <div class="wishlist-card">
      <img src="${item.image}" alt="${item.title}" class="wishlist-image">
      <div class="wishlist-content">
        <h4>${item.title}</h4>
        <p>${item.instructor}</p>
        <button class="btn-primary">Agregar al carrito - $${item.price}</button>
      </div>
    </div>
  `).join('');
}

// Cargar créditos
function loadCredits() {
  const balance = 250; // Ejemplo
  document.getElementById('creditsBalance').textContent = balance;

  const container = document.getElementById('creditsHistory');

  const transactions = [
    { description: 'Compra de créditos', amount: 500, date: '2024-01-15', type: 'positive' },
    { description: 'Uso en curso premium', amount: -150, date: '2024-01-10', type: 'negative' },
    { description: 'Bono de bienvenida', amount: 100, date: '2024-01-01', type: 'positive' }
  ];

  container.innerHTML = transactions.map(trans => `
    <div class="credit-transaction">
      <div class="transaction-info">
        <h4>${trans.description}</h4>
        <p>${new Date(trans.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}</p>
      </div>
      <div class="transaction-amount ${trans.type}">
        ${trans.amount > 0 ? '+' : ''}${trans.amount} créditos
      </div>
    </div>
  `).join('');
}

// Notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#98ca3f'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
