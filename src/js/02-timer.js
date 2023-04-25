import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.getElementById('datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const d = document.querySelector('span[data-days]');
const h = document.querySelector('span[data-hours]');
const m = document.querySelector('span[data-minutes]');
const s = document.querySelector('span[data-seconds]');

let timer = 0;

buttonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];
    let today = new Date();
    console.log(selectedDates[0]);

    if (selectedDate < today) {
      window.alert('Please choose a date in the future');
      buttonEl.disabled = true;
    } else {
      buttonEl.disabled = false;
      buttonEl.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
      if (s.innerHTML === '00') {}
    }
  },
};
flatpickr(inputEl, options);

function changeTimerValue() {
  let timerId = setInterval(() => {
    let countdown = new Date(inputEl.value) - new Date();
    buttonEl.disabled = true;
    inputEl.disabled = true;

    if (countdown >= 0) {
      let timerData = convertMs(countdown);
      d.textContent = addLeadingZero(timerData.days);
      h.textContent = addLeadingZero(timerData.hours);
      m.textContent = addLeadingZero(timerData.minutes);
      s.textContent = addLeadingZero(timerData.seconds);
    } else {
      clearInterval(timerId);
      window.alert('Countdown has ended!');
    }
  }, 1000);
  

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
