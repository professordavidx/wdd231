// Site-wide footer information.
//
// Automatically updates the copyright year and displays
// the document's last modified date so the information
// stays current without manual updates.
document.querySelector('#current-year').textContent = new Date().getFullYear();

document.querySelector('#last-modified').textContent =
  `Last Modified: ${document.lastModified}`;
