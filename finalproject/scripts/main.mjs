import './navigation.mjs';
import { loadFeaturedCreatures } from './featured.mjs';

loadFeaturedCreatures();

document.querySelector('#current-year').textContent = new Date().getFullYear();

document.querySelector('#last-modified').textContent =
  `Last Modified: ${document.lastModified}`;
