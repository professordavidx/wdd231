// Responsive navigation menu.
//
// On small screens, the navigation links are hidden by default.
// Clicking the hamburger button toggles the "open" class,
// allowing CSS to show or hide the menu.
const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});
