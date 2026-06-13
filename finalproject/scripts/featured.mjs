// Randomizes an array using a shuffle algorithm.
//
// The home page displays three random creatures each time it loads,
// helping showcase different entries from the compendium.
function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Retrieves creature data from the local JSON file using Fetch API.
//
// This fulfills the project requirement to load external data
// asynchronously and generate content dynamically.
export async function loadFeaturedCreatures() {
  const container = document.querySelector('#featured-creatures');

  try {
    // Container where the featured creature cards will be inserted.
    const response = await fetch('data/creatures.json');

    if (!response.ok) {
      throw new Error('Unable to load creature data.');
    }

    const creatures = await response.json();

    // Select three random creatures and generate their cards
    // using template literals.
    const featuredCreatures = shuffleArray(creatures).slice(0, 3);
    container.innerHTML = featuredCreatures
      .map(
        (creature) => `
          <article class="creature-card">
            <img
              src="${creature.image}"
              alt="${creature.name}"
              loading="lazy"
              width="400"
              height="300"
            >

            <div class="creature-card-content">
              <h3>${creature.name}</h3>

              <p class="origin">${creature.origin}</p>

              <p class="creature-card-description">${creature.shortDescription}</p>

              <button
                class="learn-more-btn"
                data-id="${creature.id}"
              >
                Learn More
              </button>
            </div>
          </article>
        `,
      )
      .join('');

    return creatures;
  } catch (error) {
    console.error(error);

    // Display a user-friendly message if the JSON file
    // cannot be loaded.
    container.innerHTML = `
      <p class="error-message">
        Featured creatures could not be loaded at this time.
      </p>
    `;

    return [];
  }
}
