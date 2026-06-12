function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id, button) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);

    button.textContent = '♡';
    button.classList.remove('active');
  } else {
    favorites.push(id);

    button.textContent = '♥';
    button.classList.add('active');
  }

  saveFavorites(favorites);
}

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
      >
        ${isFavorite(creature.id) ? '♥' : '♡'}
      </button>
    </div>
  </div>
</article>

`;
}

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

    creatures.forEach((creature) => {
      if (!regions[creature.region]) {
        regions[creature.region] = [];
      }

      regions[creature.region].push(creature);
    });

    container.innerHTML = Object.entries(regions)
      .map(([region, regionCreatures]) =>
        createRegionSection(region, regionCreatures),
      )
      .join('');

    document.querySelectorAll('.favorite-btn').forEach((button) => {
      button.addEventListener('click', () => {
        toggleFavorite(Number(button.dataset.id), button);
      });
    });

    document.querySelectorAll('.region-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        button.classList.toggle('open');

        content.classList.toggle('open');

        const expanded = button.classList.contains('open');

        button.setAttribute('aria-expanded', expanded);
      });
    });

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
    console.error(error);

    container.innerHTML = `
  <p>
    Creature data could not be loaded.
  </p>
`;
  }
}

document.querySelector('#menu-button').addEventListener('click', () => {
  document.querySelector('#primary-nav').classList.toggle('open');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

document.querySelector('#last-modified').textContent =
  `Last Modified: ${document.lastModified}`;

loadCompendium();
