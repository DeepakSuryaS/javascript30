/* get the elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* write the functions */
function togglePlay() {

  // paused is a property of the video element. unfortunately played doesn't exist.
  /* if(video.paused) {
    video.play();
  } else {
    video.pause();
  } */

  // this is the same as the above if block
  const method = video.paused ? 'play' : 'pause';
  video[method](); // don't panic this [] is the object notation
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip); // dataset value is a string so we're wrapping in parseFloat
}

function handleRangeUpdate() {
  // console.log(this.name);
  // console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen(e) {
  if(e.keyCode == 70) { // keycode for f key
    if(!document.fullscreenElement || !document.webkitFullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}

/* hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // if mousedown is true, it moves to scrub() else breaks out. this is similar to an if block
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// fullscreen toggle with 'f' key
document.addEventListener('keyup', toggleFullScreen);
