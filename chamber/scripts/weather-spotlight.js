// Orchestration Ecosystem for Weather Streams & Spotlights Arrays
const CURRENT_URL =
  'https://api.openweathermap.org/data/2.5/weather?lat=4.6097&lon=-74.0817&units=imperial&appid=8e425eb61be4011a017b0692c7bd384a';
const FORECAST_URL =
  'https://api.openweathermap.org/data/2.5/forecast?lat=4.6097&lon=-74.0817&units=imperial&appid=8e425eb61be4011a017b0692c7bd384a';
const MEMBERS_DATA_URL = 'data/members.json';

// Initialization Execution
document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();
  fetchSpotlightMembers();
});

/* ==========================================================================
   Weather Integration Pipeline
   ========================================================================== */
async function fetchWeatherData() {
  try {
    // Run parallel promises requests to avoid network execution blocks
    const [currentRes, forecastRes] = await Promise.all([
      fetch(CURRENT_URL),
      fetch(FORECAST_URL),
    ]);

    if (!currentRes.ok || !forecastRes.ok)
      throw new Error('Weather pipeline communication error.');

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    renderCurrentWeather(currentData);
    renderForecastWeather(forecastData);
  } catch (error) {
    console.error(
      'Failed to compile external data weather telemetry streams:',
      error,
    );
    document.getElementById('current-weather-wrapper').innerHTML =
      `<p class="error-msg">Weather feeds temporarily unavailable.</p>`;
  }
}

function renderCurrentWeather(data) {
  const wrapper = document.getElementById('current-weather-wrapper');
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  wrapper.innerHTML = `
        <div class="current-weather-box">
            <img src="${iconUrl}" alt="${data.weather[0].description}" width="100" height="100">
            <div>
                <div class="weather-temp">${Math.round(data.main.temp)}°F</div>
                <div class="weather-desc">${data.weather[0].description}</div>
            </div>
        </div>
    `;
}

function renderForecastWeather(data) {
  const wrapper = document.getElementById('forecast-wrapper');

  // Filter out the items returning data records near noon intervals (every 24 hour jumps)
  const dailyRecords = data.list
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  let htmlContent = `<div class="forecast-grid">`;

  dailyRecords.forEach((record) => {
    const dateObj = new Date(record.dt * 1000);
    const dayOptions = { weekday: 'short' };
    const dayLabel = dateObj.toLocaleDateString('en-US', dayOptions);

    htmlContent += `
            <div class="forecast-day">
                <h3>${dayLabel}</h3>
                <p>${Math.round(record.main.temp)}°F</p>
            </div>
        `;
  });

  htmlContent += `</div>`;
  wrapper.innerHTML = htmlContent;
}

/* ==========================================================================
   Random Spotlight Rendering Array Engine
   ========================================================================== */
async function fetchSpotlightMembers() {
  try {
    const response = await fetch(MEMBERS_DATA_URL);
    if (!response.ok) throw new Error('JSON asset tracking error.');
    const members = await response.json();

    // Filter strictly down to Gold (3) and Silver (2) membership tiers
    const eligiblePartners = members.filter(
      (m) => m.membershipLevel === 2 || m.membershipLevel === 3,
    );

    // Execute a random selection of 2 or 3 members
    const selectedPartners = getRandomSubarray(eligiblePartners, 3);

    renderSpotlights(selectedPartners);
  } catch (error) {
    console.error('Partner configuration catalog read failure:', error);
    document.getElementById('spotlights-container').innerHTML =
      `<p class="error-msg">Failed to load strategic directory spotlights.</p>`;
  }
}

// Fisher-Yates Shuffle Variant algorithm to pull dynamic entries cleanly
function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - size,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function renderSpotlights(partners) {
  const container = document.getElementById('spotlights-container');
  container.innerHTML = ''; // Wipe loading indicators safely

  partners.forEach((partner) => {
    const card = document.createElement('div');
    card.className = 'spotlight-card';

    const tierClass =
      partner.membershipLevel === 3 ? 'tier-gold' : 'tier-silver';
    const tierLabel =
      partner.membershipLevel === 3 ? 'Gold Partner' : 'Silver Partner';

    card.innerHTML = `
            <span class="spotlight-tier ${tierClass}">${tierLabel}</span>
            <img src="${partner.image}" alt="${partner.name} commercial identification logo" width="200" height="200" loading="lazy">
            <h3>${partner.name}</h3>
            <p class="phone-num">📞 ${partner.phone}</p>
            <p class="address-text">${partner.address}</p>
            <a href="${partner.website}" target="_blank" rel="noopener noreferrer" class="partner-link">Visit Corporate Space</a>
        `;
    container.appendChild(card);
  });
}
