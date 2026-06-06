import { regionalAttractions } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Process and Run Visitor Telemetry Checkups
  executeVisitorTelemetry();

  // 2. Render Collection Cards
  renderDiscoverGrid(regionalAttractions);
});

function executeVisitorTelemetry() {
  const messageElement = document.getElementById('visitor-message');
  if (!messageElement) return;

  const currentTimestamp = Date.now();
  const lastVisit = localStorage.getItem('chamber-last-visit');

  // Baseline Fallback: Client's absolute first visit to the domain
  if (!lastVisit) {
    messageElement.textContent =
      'Welcome! Let us know if you have any questions.';
  } else {
    const timeDifference = currentTimestamp - parseInt(lastVisit, 10);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDayInMilliseconds) {
      messageElement.textContent = 'Back so soon! Awesome!';
    } else {
      const wholeDays = Math.floor(timeDifference / oneDayInMilliseconds);
      if (wholeDays === 1) {
        messageElement.textContent = 'You last visited 1 day ago.';
      } else {
        messageElement.textContent = `You last visited ${wholeDays} days ago.`;
      }
    }
  }

  // Commit current state payload back down to client browser memory storage
  localStorage.setItem('chamber-last-visit', currentTimestamp.toString());
}

function renderDiscoverGrid(items) {
  const container = document.getElementById('discover-grid-container');
  if (!container) return;

  container.innerHTML = ''; // Clean canvas frame pipeline

  items.forEach((item, index) => {
    // Structural layout factory matching requirements exactly
    const card = document.createElement('div');
    card.className = `discover-card disc-card-${index}`;

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img 
          src="${item.image}" 
          alt="Visual perspective capture of ${item.title}" 
          width="300" 
          height="200" 
          loading="lazy"
        />
      </figure>
      <p>${item.description}</p>
      <address>${item.address}</address>
      <button type="button">Learn More</button>
    `;

    container.appendChild(card);
  });
}
