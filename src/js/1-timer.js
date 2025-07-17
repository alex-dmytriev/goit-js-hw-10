import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import errorIcon from '../img/error-icon.svg';

// Global variables
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const toastBaseOpts = {
  message: 'Please choose a date in the future',
  position: 'topRight',
  progressBar: 'false',
  iconUrl: errorIcon,
};

refs.btnEl.disabled = true;
let userSelectedDate = null;

// Utility functions & objects
const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error(toastBaseOpts);
      refs.btnEl.disabled = true;
    } else {
      refs.btnEl.disabled = false;
      userSelectedDate = selectedDates[0];
    }
    return userSelectedDate;
  },
};

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

// Event handlers
function onClickBtn(e) {
  refs.inputEl.disabled = true;
  refs.btnEl.disabled = true;

  const userTimeStamp = userSelectedDate.getTime();

  const intervalID = setInterval(() => {
    const timeRange = userTimeStamp - Date.now();
    const convertTime = convertMs(timeRange);

    if (timeRange < 1) {
      clearInterval(intervalID);
      refs.inputEl.disabled = false;
    } else {
      const addLeadingZero = value => String(value).padStart(2, '0');
      refs.daysEl.textContent = addLeadingZero(convertTime.days);
      refs.hoursEl.textContent = addLeadingZero(convertTime.hours);
      refs.minutesEl.textContent = addLeadingZero(convertTime.minutes);
      refs.secondsEl.textContent = addLeadingZero(convertTime.seconds);
    }
  }, 1000);
}

// Event listeners
refs.btnEl.addEventListener('click', onClickBtn);

// Init functions & packages
flatpickr(refs.inputEl, flatpickrOptions);
