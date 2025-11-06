// js/curso.js
const course = JSON.parse(localStorage.getItem("selectedCourse"));
const detailDiv = document.getElementById("courseDetail");

if (!detailDiv) {
  // Evita errores si el div no existe
  console.warn('No se encontró el elemento con id "courseDetail"');
} else if (!course) {
  detailDiv.innerHTML = "<p>No se encontró el curso seleccionado.</p>";
} else {
  detailDiv.innerHTML = `
    <div class="course-header">
      <img src="${course.image}" alt="${course.title}">
      <div class="course-info">
        <h1>${course.title}</h1>
        <p>${course.description || "Este curso te enseñará desde los fundamentos hasta técnicas avanzadas."}</p>
        <button onclick="alert('Te has inscrito en el curso 🎉')">Inscribirse</button>
        <a href="dashboard.html" class="back-link">← Volver al Dashboard</a>
      </div>
    </div>
  `;
}