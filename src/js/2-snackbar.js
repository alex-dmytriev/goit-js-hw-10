import iziToast from 'izitoast';

// References
const refs = {
  formEl: document.querySelector('.form'),
  numInputEl: document.querySelector('input[type="number"]'),
  fullfilledRbtn: document.querySelector('input[value="fulfilled"]'),
  rejectedRbtn: document.querySelector('input[value="rejected"]'),
  submitBtn: document.querySelector('button'),
};

const toastBaseOpts = {
  position: 'topRight',
  progressBar: 'false',
  icon: '',
};

// Handlers
function onSubmit(e) {
  e.preventDefault();
  const delay = refs.numInputEl.value;
  const fulfilled = refs.fullfilledRbtn.checked;
  const rejected = refs.rejectedRbtn.checked;
  e.target.reset();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilled) {
        resolve();
      } else if (rejected) {
        reject();
      }
    }, delay);
  });

  promise
    .then(data => {
      iziToast.success({
        ...toastBaseOpts,
        title: '✅',
        message: `Fulfilled in ${delay}ms`,
      });
    })
    .catch(err => {
      iziToast.error({
        ...toastBaseOpts,
        title: '❌',
        message: `Rejected in ${delay}ms`,
      });
    });
}

// Event Listeners
refs.formEl.addEventListener('submit', onSubmit);
