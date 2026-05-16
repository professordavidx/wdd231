document.addEventListener('DOMContentLoaded', () => {
  const directoryContainer = document.getElementById('directory-container');
  const gridBtn = document.getElementById('grid-btn');
  const listBtn = document.getElementById('list-btn');

  const dataSourceUrl = 'data/members.json';
  let membersData = [];

  // Async Fetch Core Engine
  async function getMembersData() {
    try {
      const response = await fetch(dataSourceUrl);
      if (!response.ok) {
        throw new Error(`HTTP Error Status Verified: ${response.status}`);
      }
      membersData = await response.json();
      renderGridView(membersData); // Default setup
    } catch (error) {
      console.error(
        'Execution halt: Failed fetching parsing JSON matrix maps:',
        error,
      );
      directoryContainer.innerHTML = `<p style='color:#CE1126; font-weight:bold; text-align:center;'>Unable to process directory profiles at this time.</p>`;
    }
  }

  // Template Renderer: Card Structure View
  function renderGridView(data) {
    directoryContainer.className = 'grid-view';
    directoryContainer.innerHTML = ''; // Wipe area

    data.forEach((member) => {
      const card = document.createElement('section');
      card.className = 'card';

      let tier = 'Member';
      if (member.membershipLevel === 2) tier = 'Silver Member';
      if (member.membershipLevel === 3) tier = 'Gold Member';

      card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" width="200" height="200" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline">"${member.tagline}"</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Tier:</strong> ${tier}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
      directoryContainer.appendChild(card);
    });
  }

  // Template Renderer: Row Structural List View
  function renderListView(data) {
    directoryContainer.className = 'list-view';
    directoryContainer.innerHTML = ''; // Wipe area

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    data.forEach((member) => {
      const row = document.createElement('tr');

      row.innerHTML = `
                <td>${member.name}</td>
                <td>${member.address}</td>
                <td>${member.phone}</td>
                <td><a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace('https://', '')}</a></td>
                <td class="hide-list-attr">${member.tagline}</td>
            `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    directoryContainer.appendChild(table);
  }

  // Interactivity Controls Bindings
  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('view-active');
    listBtn.classList.remove('view-active');
    renderGridView(membersData);
  });

  listBtn.addEventListener('click', () => {
    listBtn.classList.add('view-active');
    gridBtn.classList.remove('view-active');
    renderListView(membersData);
  });

  // Execute Request Lifecycle
  getMembersData();
});
