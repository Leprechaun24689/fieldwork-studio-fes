const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const compactLayout = matchMedia('(max-width: 850px)');

document.documentElement.classList.add('js');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
}

function syncMenu() {
  if (!compactLayout.matches && document.activeElement === menu) {
    navigation.querySelector('a').focus();
  } else if (compactLayout.matches && navigation.contains(document.activeElement)) {
    menu.hidden = false;
    menu.focus();
  }
  menu.hidden = !compactLayout.matches;
  setMenu(false);
}

syncMenu();
compactLayout.addEventListener('change', syncMenu);
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', (event) => {
  if (!compactLayout.matches || !event.target.closest('a')) return;
  const target = document.querySelector(event.target.closest('a').hash);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

const contactEmail = document.querySelector('#contact-email');
const planStatus = document.querySelector('#plan-status');
let selectedPlan;

document.querySelector('#hero-email').form.addEventListener('submit', (event) => {
  event.preventDefault();
  contactEmail.value = document.querySelector('#hero-email').value;
  contactEmail.focus();
});

document.querySelectorAll('[data-plan]').forEach((button) => {
  button.addEventListener('click', () => {
    selectedPlan = button.dataset.plan;
    planStatus.textContent = selectedPlan + ' selected. Try the demo signup below.';
    contactEmail.focus();
  });
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  planStatus.textContent = selectedPlan
    ? 'Demo signup complete for ' + selectedPlan + '. No email was sent.'
    : 'Demo signup complete. No email was sent.';
  event.target.reset();
});

const testimonials = [
  ['We had a page to review on the first day, which gave us more time to get the copy right.', 'Jamie · Fictional studio owner'],
  ['The mobile layout gave our team a starting point for reviewing the site on a phone.', 'Morgan · Fictional project lead'],
  ['Reordering the sections helped us put our most important work first.', 'Alex · Fictional designer']
];
let quoteIndex = 0;

function showQuote(direction) {
  quoteIndex = (quoteIndex + direction + testimonials.length) % testimonials.length;
  const [quote, credit] = testimonials[quoteIndex];
  document.querySelector('#quote-text').textContent = '“' + quote + '”';
  document.querySelector('#quote-credit').textContent = credit;
  document.querySelector('#quote-status').textContent = 'Testimonial ' + (quoteIndex + 1) + ' of ' + testimonials.length + '. ' + quote + ' ' + credit;
}

document.querySelector('#previous').addEventListener('click', () => showQuote(-1));
document.querySelector('#next').addEventListener('click', () => showQuote(1));
