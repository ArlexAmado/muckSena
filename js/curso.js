// Cargar datos del curso desde localStorage
document.addEventListener('DOMContentLoaded', () => {
  const courseData = JSON.parse(localStorage.getItem('selectedCourse'));
  
  if (courseData) {
    loadCourseData(courseData);
  } else {
    // Datos de ejemplo si no hay curso seleccionado
    loadCourseData({
      title: 'JavaScript Moderno: ES6+',
      description: 'Domina las características modernas de JavaScript y conviértete en un desarrollador profesional',
      category: 'Desarrollo Web',
      instructor: 'Carlos Pérez',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop'
    });
  }
  
  // Inicializar tabs
  initializeTabs();
  
  // Inicializar secciones del curriculum
  initializeCurriculum();
});

function loadCourseData(course) {
  // Actualizar título y metadatos
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.description;
  document.getElementById('courseBadge').textContent = course.category;
  document.getElementById('courseBreadcrumb').textContent = course.title;
  document.getElementById('courseInstructor').textContent = course.instructor;
  document.getElementById('instructorName').textContent = course.instructor;
  document.getElementById('courseRating').textContent = course.rating;
  
  // Actualizar imagen
  if (course.image) {
    document.getElementById('courseImage').src = course.image;
  }
  
  // Actualizar título de la página
  document.title = `${course.title} - MuckSena`;
}

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover active de todos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Agregar active al clickeado
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function initializeCurriculum() {
  const sectionHeaders = document.querySelectorAll('.section-header');
  
  sectionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.section-icon');
      
      if (content && content.classList.contains('section-content')) {
        // Toggle visibility
        if (content.style.display === 'block') {
          content.style.display = 'none';
          icon.textContent = '▶';
        } else {
          content.style.display = 'block';
          icon.textContent = '▼';
        }
      }
    });
  });
  
  // Abrir la primera sección por defecto
  const firstContent = document.querySelector('.section-content');
  if (firstContent) {
    firstContent.style.display = 'block';
  }
}

// Funcionalidad de botones de compra
document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.btn-primary');
  const cartButton = document.querySelector('.btn-secondary');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      showPurchaseModal();
    });
  });
  
  if (cartButton) {
    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart();
    });
  }
  
  // Click en cursos relacionados
  const relatedCards = document.querySelectorAll('.related-card');
  relatedCards.forEach(card => {
    card.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        alert('Cargando nuevo curso... 🎓');
      }, 500);
    });
  });
});

function showPurchaseModal() {
  const courseTitle = document.getElementById('courseTitle').textContent;
  const confirmed = confirm(`¿Deseas comprar el curso "${courseTitle}" por $49.99?\n\n✓ Acceso de por vida\n✓ Certificado de finalización\n✓ Garantía de 30 días`);
  
  if (confirmed) {
    alert('¡Compra exitosa! 🎉\n\nRecibirás un email de confirmación.\nYa puedes comenzar el curso.');
    // Aquí iría la lógica real de compra
  }
}

async function addToCart() {
  const courseTitle = document.getElementById('courseTitle').textContent;
  const courseData = JSON.parse(localStorage.getItem('selectedCourse'));
  
  if (!courseData) {
    showNotification('Error: No se pudo cargar el curso');
    return;
  }
  
  // Obtener token de sesión
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.token) {
    showNotification('Debes iniciar sesión para comprar cursos');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 2000);
    return;
  }
  
  try {
    const response = await fetch('http://localhost:3000/api/courses/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify({
        courseId: courseData.id,
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        instructor: courseData.instructor,
        rating: courseData.rating,
        image: courseData.image,
        price: 49.99
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showNotification(`"${courseTitle}" agregado a tus cursos 🎉`);
    } else {
      showNotification(data.message || 'Error al agregar el curso');
    }
  } catch (error) {
    console.error('Error al comprar curso:', error);
    showNotification('Error al conectar con el servidor');
  }
}

function showNotification(message) {
  // Crear notificación temporal
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #98ca3f;
    color: #1a1f2e;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Animación de scroll para el botón flotante
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const floatingBuy = document.querySelector('.floating-buy');
  if (!floatingBuy) return;
  
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 500) {
    floatingBuy.style.transform = 'translateY(0)';
  } else {
    floatingBuy.style.transform = 'translateY(100%)';
  }
  
  lastScroll = currentScroll;
});

// Agregar estilos de animación
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
  
  .floating-buy {
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);
