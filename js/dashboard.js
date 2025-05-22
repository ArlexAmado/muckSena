// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Obtener y mostrar el nombre del usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user && user.name) {
    document.getElementById("username").textContent = user.name;
  }

  // Evento de cerrar sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }

  // Cursos por categoría
  const coursesByCategory = {
    Programación: [
      {
        title: "Curso de JavaScript Moderno",
        description: "Aprende JavaScript desde cero hasta avanzado, incluyendo ES6+.",
        image: "images/cursos/java-script1.jpg",
      },
      {
        title: "Curso de Python para Principiantes",
        description: "Domina los fundamentos de Python con ejemplos prácticos.",
        image: "img/python-course.jpg",
      },
    ],
    Diseño: [
      {
        title: "Diseño UX/UI desde Cero",
        description: "Conoce los principios del diseño centrado en el usuario.",
        image: "img/uxui-course.jpg",
      },
    ],
    Marketing: [
      {
        title: "Marketing Digital en Redes Sociales",
        description: "Aprende a usar Facebook, Instagram y TikTok para tu negocio.",
        image: "img/marketing-course.jpg",
      },
    ],
    Negocios: [
      {
        title: "Emprendimiento y Modelo de Negocio",
        description: "Crea un plan de negocio sólido y ponlo en marcha.",
        image: "img/business-course.jpg",
      },
    ],
  };

  // Mostrar curso destacado
  function showCourses(category) {
    const featuredCourse = document.getElementById("featuredCourse");
    featuredCourse.innerHTML = "";

    const courses = coursesByCategory[category] || [];
    if (courses.length > 0) {
      const course = courses[0]; // Solo mostrar el primero
      featuredCourse.innerHTML = `
        <img src="${course.image}" alt="${course.title}" />
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <p class="duration">Duración: 10 horas</p>
        <button class="ver-curso-btn">Ver Curso</button>
      `;

      // Guardar curso seleccionado y redirigir
      featuredCourse.querySelector(".ver-curso-btn").addEventListener("click", () => {
        localStorage.setItem("selectedCourse", JSON.stringify(course));
        window.location.href = "curso.html";
      });
    } else {
      featuredCourse.innerHTML = "<p>No hay cursos disponibles en esta categoría.</p>";
    }
  }

  // Asociar evento a los enlaces del menú de categorías
  document.querySelectorAll('.dropdown-content a[data-category]').forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const category = item.getAttribute("data-category");
      showCourses(category);
    });
  });

  // Mostrar la primera categoría por defecto
  const defaultCategory = "Programación";
  showCourses(defaultCategory);
});
