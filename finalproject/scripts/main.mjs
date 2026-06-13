// Shared functionality used across multiple pages.
import './navigation.mjs';
import './site-info.mjs';

// Home page modules responsible for dynamic content generation
// and modal interaction.
import { loadFeaturedCreatures } from './featured.mjs';
import { initializeModal } from './modal.mjs';

// Load creature data from the JSON file.
// The full dataset is returned so it can also be used by the modal.
const creatures = await loadFeaturedCreatures();

// Connect all "Learn More" buttons to the modal dialog.
initializeModal(creatures);
