document.addEventListener('DOMContentLoaded', () => {
  // 1. Telemetry Hidden Timestamp Population Engine
  const timestampField = document.getElementById('form-timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // 2. Modular Overlay Control Infrastructure
  const openButtons = document.querySelectorAll('.modal-open-btn');
  const closeButtons = document.querySelectorAll('.modal-close-btn');

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.showModal(); // Opens natively with accessible backdrop configuration
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const openModal = button.closest('dialog');
      if (openModal) {
        openModal.close();
      }
    });
  });

  // Safe escape handler fallback when clicking outside the structural content box
  window.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIALOG') {
      event.target.close();
    }
  });
});
