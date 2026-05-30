document.addEventListener('DOMContentLoaded', () => {
  const summaryContainer = document.getElementById('summary-content');
  if (!summaryContainer) return;

  // Extract query string parameter maps safely out of location properties
  const urlParams = new URLSearchParams(window.location.search);

  // Helper utility function to clear formatting traces and sanitize inputs
  function getCleanParam(key) {
    const value = urlParams.get(key);
    return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : null;
  }

  // Target required elements out of specifications matrix
  const dataPayload = {
    'First Name': getCleanParam('firstName'),
    'Last Name': getCleanParam('lastName'),
    'Email Address': getCleanParam('email'),
    'Mobile Phone': getCleanParam('phone'),
    'Organization Name': getCleanParam('organization'),
    'Application Timestamp': getCleanParam('timestamp'),
  };

  // Verify entry values exist; fallback cleanly if accessed outside form loops
  if (!dataPayload['First Name'] && !dataPayload['Email Address']) {
    summaryContainer.innerHTML = `
      <p style="color:#CE1126; font-weight:bold; text-align:center;">
        ⚠️ No active application registry stream detected. Please submit the form.
      </p>`;
    return;
  }

  // Format the ISO time data points into readable strings
  let formattedTime = dataPayload['Application Timestamp'];
  if (formattedTime) {
    try {
      formattedTime = new Date(formattedTime).toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'medium',
      });
    } catch (e) {
      // Graceful fallback to original string if error encountered
    }
  }

  // Build the presentation DOM output tree
  summaryContainer.innerHTML = `
    <p><strong>First Name:</strong> ${dataPayload['First Name']}</p>
    <p><strong>Last Name:</strong> ${dataPayload['Last Name']}</p>
    <p><strong>Email Address:</strong> <a href="mailto:${dataPayload['Email Address']}">${dataPayload['Email Address']}</a></p>
    <p><strong>Mobile Phone:</strong> ${dataPayload['Mobile Phone']}</p>
    <p><strong>Organization:</strong> ${dataPayload['Organization Name']}</p>
    <p><strong>Submission Log:</strong> ${formattedTime || 'Not recorded'}</p>
  `;
});
