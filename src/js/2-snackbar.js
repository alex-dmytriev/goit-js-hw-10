import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// References
const refs = {
  formEl: document.querySelector('.form'),
  numInputEl: document.querySelector('input[type="number"]'),
  fullfilledRbtn: document.querySelector('input[value="fulfilled"]'),
  rejectedRbtn: document.querySelector('input[value="rejected"]'),
  submitBtn: document.querySelector('button'),
};

iziToast.error({
  message: 'suka',
  position: 'topRight',
});

iziToast.success({
  title: 'OK',
  message: 'Success Yo',
});

// Utilies
function iziToastOptions(title, message, bgColor, iconUrl) {
  return {
    messageColor: '#fff',
    messageSize: '16px',
    messgeLineHeight: '24px',
    position: 'topRight',
    timeout: 2000,
  };
}

// Handlers
function onSubmit(e) {
  e.preventDefault();
  const delay = refs.numInputEl.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refs.fullfilledRbtn.checked) {
        resolve(() => {});
      } else if (refs.rejectedRbtn.checked) {
        reject((iziToastOptions.message = `Rejected promise in ${delay}ms`));
      }
    }, delay);
  });

  promise
    .then(data => iziToast.show(iziToastOptions))
    .catch(err => iziToast.show(iziToastOptions));
}

// Event Listeners
refs.formEl.addEventListener('submit', onSubmit);

// Init
//--- THINK OF USING BUILT-IN METHODS INSIDE IZI OPTIONS TO DYNAMICALLY HANDLE VALUES
// ALSO RECALL .TARGET ADDRESSING INSIDE ONSUBMIT
// ALSO TRIM INPUT VALUE BUT MAYBE INPUT NUMBER DO NOT ALLOW SPACES
// SHIT MOTHER FUCKER - USE ANOTHER APPROACH ON IZI JUST IZITOAST.ERROR OR IZITOAST.INFO SUKA ---
