// Handles the modal dialog used on the home page.
//
// Creature information is loaded dynamically based on the
// card selected by the user.
export function initializeModal(creatures) {
  const modal = document.querySelector('#creature-modal');

  const closeButton = document.querySelector('#close-modal');

  const modalName = document.querySelector('#modal-name');

  const modalOrigin = document.querySelector('#modal-origin');

  const modalType = document.querySelector('#modal-type');

  const modalAbility = document.querySelector('#modal-ability');

  const modalSymbolism = document.querySelector('#modal-symbolism');

  const modalDescription = document.querySelector('#modal-description');

  // Event delegation is used so all current and future
  // "Learn More" buttons can be handled through a single listener.
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.learn-more-btn');

    if (!button) {
      return;
    }

    // Find the matching creature and populate the modal
    // with additional information from the JSON dataset.
    const creatureId = Number(button.dataset.id);

    const creature = creatures.find((c) => c.id === creatureId);

    if (!creature) {
      return;
    }

    modalName.textContent = creature.name;
    modalOrigin.textContent = creature.origin;
    modalType.textContent = creature.type;
    modalAbility.textContent = creature.ability;
    modalSymbolism.textContent = creature.symbolism;
    modalDescription.textContent = creature.mediumDescription;

    modal.showModal();
  });

  // Improves usability by allowing the dialog to close
  // when the user clicks outside the modal window.
  closeButton.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (!clickedInDialog) {
      modal.close();
    }
  });
}
