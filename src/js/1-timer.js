import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const button = document.querySelector('[data-start]');
button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);
const picker = document.querySelector('#datetime-picker');
button.addEventListener('click', startTimer);
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function startTimer() {
  picker.disabled = true;
  button.disabled = true;
  const timerInterval = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    const time = convertMs(timeDifference);
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      dataDays.textContent = addLeadingZero(0);
      dataHours.textContent = addLeadingZero(0);
      dataMin.textContent = addLeadingZero(0);
      dataSec.textContent = addLeadingZero(0);
      picker.disabled = false;
      return;
    }
    dataDays.textContent = addLeadingZero(time.days);
    dataHours.textContent = addLeadingZero(time.hours);
    dataMin.textContent = addLeadingZero(time.minutes);
    dataSec.textContent = addLeadingZero(time.seconds);
  }, 1000);
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
