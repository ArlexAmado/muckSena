// Cargar información del usuario
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo();
  loadMyCourses();
  setupEventListeners();
});

function loadUserInfo() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.loggedIn) {
    window.location.href = 'dashboard.html';
    return;
  }

  const userName = document.getElementById('userName');
  if (userName && session.username) {
    userName.textContent = session.username;
  }

  const avatar = document.querySelector('.avatar');
  if (avatar && session.username) {
    avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(session.username)}&background=98ca3f&color=fff`;
  }
}

async function loadMyCourses() {
  const coursesContainer = document.getElementById('coursesContainer');
  const emptyState = document.getElementById('emptyState');

  // Obtener token de sesión
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.token) {
    window.location.href = 'dashboard.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/courses/my-courses`, {
      headers: {
        'Authorization': `Bearer ${session.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al cargar cursos');
    }

    const data = await response.json();
    const courses = data.courses || [];

    if (courses.length === 0) {
      coursesContainer.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }

    coursesContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    // Formatear cursos con progreso y fecha
    const coursesWithProgress = courses.map(course => ({
      ...course,
      id: course.courseId,
      progress: course.progress || 0,
      lastAccessed: new Date(course.purchasedAt).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }));

    displayCourses(coursesWithProgress);
  } catch (error) {
    console.error('Error al cargar cursos:', error);
    coursesContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
        <h3 style="font-size: 1.5rem; color: #9ca3af;">Error al cargar tus cursos</h3>
        <p style="color: #6b7280;">Por favor, intenta de nuevo más tarde</p>
      </div>
    `;
  }
}

function displayCourses(courses) {
  const coursesContainer = document.getElementById('coursesContainer');

  coursesContainer.innerHTML = courses.map(course => `
    <div class="my-course-card" data-course-id="${course.id}">
      <div class="course-image-wrapper">
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <div class="course-overlay">
          <button class="play-btn">▶ Continuar</button>
        </div>
      </div>
      <div class="course-content">
        <span class="course-category">${course.category}</span>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-instructor">👤 ${course.instructor}</p>
        
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${course.progress}%"></div>
          </div>
          <span class="progress-text">${course.progress}% completado</span>
        </div>
        
        <div class="course-meta">
          <span class="last-accessed">Último acceso: ${course.lastAccessed}</span>
          <div class="course-actions">
            <button class="action-btn" title="Descargar certificado">🏆</button>
            <button class="action-btn" title="Compartir">📤</button>
            <button class="action-btn" title="Más opciones">⋯</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Agregar event listeners
  attachCourseListeners();
}

function attachCourseListeners() {
  document.querySelectorAll('.my-course-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Si no es un botón de acción, ir al curso
      if (!e.target.closest('.action-btn')) {
        const courseId = card.dataset.courseId;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const course = cart.find(c => c.id == courseId);

        if (course) {
          localStorage.setItem('selectedCourse', JSON.stringify(course));
          window.location.href = 'curso.html';
        }
      }
    });
  });

  // Botones de acción
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('title');
      alert(`${title} - Próximamente`);
    });
  });
}

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

  // Filtros
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      filterCourses(filter);
    });
  });

  // Ordenar
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortCourses(sortSelect.value);
    });
  }

  // Búsqueda
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchCourses(e.target.value);
    });
  }
}

async function filterCourses(filter) {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.token) return;

  try {
    const response = await fetch(`${API_URL}/courses/my-courses`, {
      headers: {
        'Authorization': `Bearer ${session.token}`
      }
    });

    const data = await response.json();
    let courses = data.courses || [];

    if (filter === 'in-progress') {
      courses = courses.filter(c => c.progress > 0 && c.progress < 100);
    } else if (filter === 'completed') {
      courses = courses.filter(c => c.progress === 100);
    } else if (filter === 'wishlist') {
      courses = [];
    }

    if (courses.length === 0) {
      document.getElementById('coursesContainer').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
          <h3 style="font-size: 1.5rem; color: #9ca3af;">No hay cursos en esta categoría</h3>
        </div>
      `;
    } else {
      const coursesWithProgress = courses.map(course => ({
        ...course,
        id: course.courseId,
        lastAccessed: new Date(course.purchasedAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      }));
      displayCourses(coursesWithProgress);
    }
  } catch (error) {
    console.error('Error al filtrar cursos:', error);
  }
}

async function sortCourses(sortBy) {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session || !session.token) return;

  try {
    const response = await fetch(`${API_URL}/courses/my-courses`, {
      headers: {
        'Authorization': `Bearer ${session.token}`
      }
    });

    const data = await response.json();
    let courses = data.courses || [];

    if (sortBy === 'title') {
      courses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'progress') {
      courses.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    } else {
      // recent - ordenar por fecha de compra
      courses.sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));
    }

    const coursesWithProgress = courses.map(course => ({
      ...course,
      id: course.courseId,
      lastAccessed: new Date(course.purchasedAt).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }));

    displayCourses(coursesWithProgress);
  } catch (error) {
    console.error('Error al ordenar cursos:', error);
  }
}

async function searchCourses(query) {
  if (!query.trim()) {
    loadMyCourses();
    return;
  }

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

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      document.getElementById('coursesContainer').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
          <h3 style="font-size: 1.5rem; color: #9ca3af;">No se encontraron cursos</h3>
          <p style="color: #6b7280;">Intenta con otra búsqueda</p>
        </div>
      `;
    } else {
      const coursesWithProgress = filtered.map(course => ({
        ...course,
        id: course.courseId,
        lastAccessed: new Date(course.purchasedAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      }));
      displayCourses(coursesWithProgress);
    }
  } catch (error) {
    console.error('Error al buscar cursos:', error);
  }
}
