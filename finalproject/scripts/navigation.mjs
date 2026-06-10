const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});
