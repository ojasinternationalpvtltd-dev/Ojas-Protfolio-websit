const form = document.querySelector('#giveaway-form');
const modal = document.querySelector('#success-modal');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  form.reset();
});
document.querySelectorAll('.close').forEach((button) => button.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}));
modal.addEventListener('click', (event) => { if (event.target === modal) event.target.querySelector('.close').click(); });
