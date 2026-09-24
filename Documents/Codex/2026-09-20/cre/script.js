const form = document.querySelector('#giveaway-form');
const modal = document.querySelector('#success-modal');
const entriesEndpoint = 'https://script.google.com/macros/s/AKfycbybFuNddCfpia988pggZnBBKulR4ksHK4r5qMIokshTPzMssH8DFaBImyv9Cc28lszI0A/exec';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  const entry = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    location: formData.get('location'),
    consent: form.querySelector('input[type="checkbox"]').checked,
  };

  submitButton.disabled = true;
  submitButton.textContent = 'Submitting…';

  try {
    await fetch(entriesEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(entry),
    });
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    form.reset();
  } catch (error) {
    alert('We could not submit your entry. Please check your internet connection and try again.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Confirm my entry <span>→</span>';
  }
});

document.querySelectorAll('.close').forEach((button) => button.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}));
modal.addEventListener('click', (event) => { if (event.target === modal) event.target.querySelector('.close').click(); });
