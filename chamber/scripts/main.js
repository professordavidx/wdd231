document.addEventListener('DOMContentLoaded', () => {
  // UI Elements Hooking
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const currentYearSpan = document.getElementById('current-year');
  const lastModifiedSpan = document.getElementById('last-modified');

  // Responsive Menu Toggle Engine
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      primaryNav.classList.toggle('open');
      menuToggle.textContent = primaryNav.classList.contains('open')
        ? '❌'
        : '☰';
    });
  }

  // Metadata Date Extraction Pipelines
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
});
