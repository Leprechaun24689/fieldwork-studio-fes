const mobileMenu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('[aria-controls="mobile-menu"]');
const closeButton = mobileMenu.querySelector('.btn__menu--close');

function openMenu() {
  mobileMenu.inert = false;
  document.body.classList.add('menu--open');
  menuToggle.setAttribute('aria-expanded', 'true');
  closeButton.focus();
}

function closeMenu() {
  document.body.classList.remove('menu--open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.inert = true;
  if (menuToggle.getClientRects().length) menuToggle.focus();
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.inert) closeMenu();
});
