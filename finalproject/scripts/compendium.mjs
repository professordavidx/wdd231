// Shared modules used across the site.
import './navigation.mjs';
import './site-info.mjs';

// Favorites are stored in localStorage so selections persist
// between visits and page reloads.
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

// Adds or removes a creature from localStorage and updates
// the heart icon to reflect the current state.
function toggleFavorite(id, button) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);

    button.textContent = '♡';
    button.classList.remove('active');
    button.title = 'Add to Favorites';
  } else {
    favorites.push(id);

    button.textContent = '❤';
    button.classList.add('active');
    button.title = 'Remove Favorite';
  }

  saveFavorites(favorites);
}

// Generates a single compendium card using template literals.
//
// Cards are created dynamically from JSON data rather than
// existing as static HTML.
function createCreatureCard(creature) {
  return ` <article class="compendium-card"> <img
     src="${creature.image}"
     alt="${creature.name}"
     loading="lazy"
     width="400"
     height="300"
   >

  <div class="compendium-card-content">
    <h3>${creature.name}</h3>

    <p class="origin">${creature.origin}</p>

    <p class="compendium-card-description">
      ${creature.mediumDescription}
    </p>

    <div class="compendium-card-footer">
      <button
        class="learn-more-btn"
        data-id="${creature.id}"
      >
        Learn More
      </button>

      <button
        class="favorite-btn ${isFavorite(creature.id) ? 'active' : ''}"
        data-id="${creature.id}"
        aria-label="Toggle favorite"
        title="${isFavorite(creature.id) ? 'Remove Favorite' : 'Add to Favorites'}"
      >
        ${isFavorite(creature.id) ? '❤' : '♡'}
      </button>
    </div>
  </div>
</article>

`;
}

// Groups creatures by geographic region.
//
// Each region can be expanded or collapsed independently.
function createRegionSection(region, creatures) {
  return ` <section class="region-section"> <button
     class="region-toggle"
     aria-expanded="false"
   > <span>${region}</span>

    <span class="arrow">▼</span>
  </button>

  <div class="region-content">
    ${creatures.map(createCreatureCard).join('')}
  </div>
</section>

`;
}

// Populates the compendium modal with detailed creature
// information, including the full description.
function populateModal(creature) {
  document.querySelector('#modal-name').textContent = creature.name;
  document.querySelector('#modal-image').src = creature.image;
  document.querySelector('#modal-image').alt = creature.name;
  document.querySelector('#modal-origin').textContent = creature.origin;
  document.querySelector('#modal-type').textContent = creature.type;
  document.querySelector('#modal-ability').textContent = creature.ability;
  document.querySelector('#modal-symbolism').textContent = creature.symbolism;
  document.querySelector('#modal-description').textContent =
    creature.fullDescription;
}

// Main compendium initialization function.
//
// Demonstrates:
// - Fetch API
// - try/catch error handling
// - dynamic content generation
// - localStorage
// - DOM manipulation
// - event handling
// - array methods
async function loadCompendium() {
  const container = document.querySelector('#compendium-container');
  const favoritesContainer = document.querySelector('#favorites-container');
  const noFavoritesMessage = document.querySelector('#no-favorites-message');

  try {
    const response = await fetch('data/creatures.json');

    if (!response.ok) {
      throw new Error('Unable to load creature data.');
    }

    const creatures = await response.json();
    const favoriteIds = getFavorites();
    // Use the filter array method to identify which creatures
    // have previously been saved as favorites.
    const favorites = creatures.filter((creature) =>
      favoriteIds.includes(creature.id),
    );

    if (favorites.length > 0) {
      favoritesContainer.innerHTML = favorites.map(createCreatureCard).join('');
      noFavoritesMessage.style.display = 'none';
    } else {
      noFavoritesMessage.style.display = 'block';
    }

    const regions = {};

    // Organize creatures into region groups for display.
    creatures.forEach((creature) => {
      if (!regions[creature.region]) {
        regions[creature.region] = [];
      }

      regions[creature.region].push(creature);
    });

    // Convert grouped region data into HTML sections.
    container.innerHTML = Object.entries(regions)
      .map(([region, regionCreatures]) =>
        createRegionSection(region, regionCreatures),
      )
      .join('');

    // Attach favorite functionality to every heart button.
    document.querySelectorAll('.favorite-btn').forEach((button) => {
      button.addEventListener('click', () => {
        toggleFavorite(Number(button.dataset.id), button);
      });
    });

    // Expand or collapse a region when its heading is clicked.
    document.querySelectorAll('.region-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        button.classList.toggle('open');
        content.classList.toggle('open');
        const expanded = button.classList.contains('open');
        button.setAttribute('aria-expanded', expanded);
      });
    });

    // Open the detailed creature modal when a user
    // requests additional information.
    const modal = document.querySelector('#creature-modal');

    document.querySelectorAll('.learn-more-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const creature = creatures.find(
          (item) => item.id === Number(button.dataset.id),
        );

        populateModal(creature);
        modal.showModal();
      });
    });

    document.querySelector('#close-modal').addEventListener('click', () => {
      modal.close();
    });

    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();

      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (clickedOutside) {
        modal.close();
      }
    });
  } catch (error) {
    // Gracefully handle fetch failures.
    console.error(error);

    container.innerHTML = `
  <p>
    Creature data could not be loaded.
  </p>
`;
  }
}

// Initialize the compendium page.
loadCompendium();
