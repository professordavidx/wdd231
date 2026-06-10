import './navigation.mjs';
import { loadFeaturedCreatures } from './featured.mjs';
import { initializeModal } from './modal.mjs';

const creatures = await loadFeaturedCreatures();

initializeModal(creatures);

document.querySelector('#current-year').textContent = new Date().getFullYear();

document.querySelector('#last-modified').textContent =
  `Last Modified: ${document.lastModified}`;
