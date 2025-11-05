// Datos de cursos de ejemplo
const courses = [
  {
    id: 1,
    title: "JavaScript Moderno: ES6+",
    description: "Domina las características modernas de JavaScript",
    category: "Desarrollo Web",
    instructor: "Carlos Pérez",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "React desde Cero",
    description: "Aprende React y crea aplicaciones web modernas",
    category: "Desarrollo Web",
    instructor: "Ana García",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Diseño UX/UI Profesional",
    description: "Crea experiencias de usuario excepcionales",
    category: "Diseño",
    instructor: "María López",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Python para Data Science",
    description: "Análisis de datos con Python y sus librerías",
    category: "Data Science",
    instructor: "Roberto Díaz",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    title: "Marketing Digital Avanzado",
    description: "Estrategias de marketing para el mundo digital",
    category: "Marketing",
    instructor: "Laura Martínez",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    title: "Node.js y Express",
    description: "Desarrollo backend con Node.js",
    category: "Desarrollo Web",
    instructor: "Juan Rodríguez",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
  },
  {
    id: 7,
    title: "Figma para Diseñadores",
    description: "Diseña interfaces profesionales con Figma",
    category: "Diseño",
    instructor: "Sofia Ramírez",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop"
  },
  {
    id: 8,
    title: "SQL y Bases de Datos",
    description: "Domina SQL y gestión de bases de datos",
    category: "Desarrollo Web",
    instructor: "Pedro Sánchez",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop"
  }
];

// Cargar cursos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay token en la URL (OAuth)
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    // Guardar token de OAuth
    const session = {
      token: token,
      loggedIn: true
    };
    localStorage.setItem('session', JSON.stringify(session));
    
    // Limpiar URL sin recargar
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // Obtener datos del usuario con el token
    fetchUserData(token);
  }
  
  loadCourses();
  loadUserInfo();
  setupEventListeners();
});

// Obtener datos del usuario desde el backend con el token
async function fetchUserData(token) {
  try {
    const response = await fetch('http://localhost:3000/api/perfil', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      const session = JSON.parse(localStorage.getItem('session'));
      session.username = userData.username;
      session.email = userData.email;
      localStorage.setItem('session', JSON.stringify(session));
      
      // Actualizar UI
      loadUserInfo();
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
  }
}

// Cargar información del usuario
function loadUserInfo() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session && session.loggedIn) {
    const userName = document.getElementById('userName');
    if (userName && session.username) {
      userName.textContent = session.username;
    }
    
    // Actualizar avatar con iniciales del usuario
    const avatar = document.querySelector('.avatar');
    if (avatar && session.username) {
      avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(session.username)}&background=98ca3f&color=fff`;
    }
  } else {
    // Si no hay sesión, redirigir al login
    window.location.href = 'home.html';
   /*  window.location.href = 'dashboard.html'; */
  }
}

// Cargar cursos en el grid
function loadCourses() {
  const coursesGrid = document.getElementById('coursesGrid');
  if (!coursesGrid) return;

  coursesGrid.innerHTML = courses.map(course => `
    <div class="course-card" data-course-id="${course.id}">
      <img src="${course.image}" alt="${course.title}" class="course-image">
      <div class="course-content">
        <span class="course-category">${course.category}</span>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-footer">
          <div class="course-instructor">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=98ca3f&color=fff&size=25" 
                 alt="${course.instructor}" 
                 class="instructor-avatar">
            <span>${course.instructor}</span>
          </div>
          <div class="course-rating">
            <span>⭐</span>
            <span>${course.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Agregar event listeners a las tarjetas de cursos
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const courseId = card.dataset.courseId;
      const course = courses.find(c => c.id == courseId);
      if (course) {
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        window.location.href = 'curso.html';
      }
    });
  });
}

// Configurar event listeners
function setupEventListeners() {
  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('session');
      window.location.href = 'dashboard.html';
    });
  }

  // Categorías
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      filterCoursesByCategory(category);
    });
  });

  // Búsqueda
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        searchCourses(query);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          searchCourses(query);
        }
      }
    });
  }

  // Rutas de aprendizaje
  document.querySelectorAll('.path-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert('¡Próximamente! Esta funcionalidad estará disponible pronto.');
    });
  });

  // CTA Button
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      window.scrollTo({
        top: document.querySelector('.featured-courses').offsetTop - 80,
        behavior: 'smooth'
      });
    });
  }
}

// Filtrar cursos por categoría
function filterCoursesByCategory(category) {
  const categoryMap = {
    'desarrollo': 'Desarrollo Web',
    'diseno': 'Diseño',
    'marketing': 'Marketing',
    'datos': 'Data Science'
  };

  const categoryName = categoryMap[category];
  const filteredCourses = courses.filter(course => 
    course.category === categoryName
  );

  if (filteredCourses.length > 0) {
    displayFilteredCourses(filteredCourses, `Cursos de ${categoryName}`);
  } else {
    alert('No hay cursos disponibles en esta categoría');
  }
}

// Buscar cursos
function searchCourses(query) {
  const lowerQuery = query.toLowerCase();
  const results = courses.filter(course => 
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery)
  );

  if (results.length > 0) {
    displayFilteredCourses(results, `Resultados para "${query}"`);
  } else {
    alert(`No se encontraron cursos para "${query}"`);
  }
}

// Mostrar cursos filtrados
function displayFilteredCourses(filteredCourses, title) {
  const sectionHeader = document.querySelector('.section-header h2');
  if (sectionHeader) {
    sectionHeader.textContent = title;
  }

  const coursesGrid = document.getElementById('coursesGrid');
  if (!coursesGrid) return;

  coursesGrid.innerHTML = filteredCourses.map(course => `
    <div class="course-card" data-course-id="${course.id}">
      <img src="${course.image}" alt="${course.title}" class="course-image">
      <div class="course-content">
        <span class="course-category">${course.category}</span>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-footer">
          <div class="course-instructor">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=98ca3f&color=fff&size=25" 
                 alt="${course.instructor}" 
                 class="instructor-avatar">
            <span>${course.instructor}</span>
          </div>
          <div class="course-rating">
            <span>⭐</span>
            <span>${course.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Re-agregar event listeners
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const courseId = card.dataset.courseId;
      const course = courses.find(c => c.id == courseId);
      if (course) {
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        window.location.href = 'curso.html';
      }
    });
  });

  // Scroll a la sección de cursos
  window.scrollTo({
    top: document.querySelector('.featured-courses').offsetTop - 80,
    behavior: 'smooth'
  });
}

// Animaciones al hacer scroll
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.course-card, .category-card, .path-card');
  elements.forEach(element => {
    const position = element.getBoundingClientRect();
    if (position.top < window.innerHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
});

// Inicializar animaciones
document.querySelectorAll('.course-card, .category-card, .path-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'all 0.5s ease';
});
