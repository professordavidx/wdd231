// Shared modules used across multiple pages.
import './navigation.mjs';
import './site-info.mjs';

// Read submitted form values from the URL query string.
//
// The suggestion form uses the GET method so submitted
// values can be displayed on this confirmation page.
const params = new URLSearchParams(window.location.search);

const container = document.querySelector('#submission-results');
// Dynamically display all submitted values so users can
// review the information they provided.
container.innerHTML = `
  <div class="result-item">
    <span class="result-label">Name</span>
    <span>${params.get('name')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Email</span>
    <span>${params.get('email')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Creature Name</span>
    <span>${params.get('creature')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Region</span>
    <span>${params.get('region')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Origin / Culture</span>
    <span>${params.get('origin')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Type</span>
    <span>${params.get('type')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Special Ability</span>
    <span>${params.get('ability')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Symbolism</span>
    <span>${params.get('symbolism')}</span>
  </div>

  <div class="result-item">
    <span class="result-label">Description</span>
    <span>${params.get('description')}</span>
  </div>
`;
