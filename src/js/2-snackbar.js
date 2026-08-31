// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');
formElement.addEventListener('submit', formSubmit);
function formSubmit(event) {
  event.preventDefault();
  const formData = new FormData(formElement);
  const formDelay = formData.get('delay');
  const formState = formData.get('state');
  let num = Number(formDelay);
  createPromise(num, formState)
    .then(value => {
      iziToast.success({ message: `✅ Fulfilled promise in ${value}ms` });
    })
    .catch(value => {
      iziToast.error({ message: `❌ Rejected promise in ${value}ms` });
    });
}
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
