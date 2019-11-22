let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); // current timestamp in milliseconds
  const then = now + seconds * 1000; // milliseconds + seconds_to_milliseconds which is the end time
  // console.log({now, then});
  displayTimeLeft(seconds);
  displayEndTime(then);

  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // milliseconds / 1000
    if(secondsLeft < 0) { // < 0 will prevent from stopping at 1 second left
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  // console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const _12hour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${_12hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// we can select the form by its name
// we can select the elements of the form using their names: formName.elementName
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value; // the input
  timer(mins * 60);
  this.reset();
})