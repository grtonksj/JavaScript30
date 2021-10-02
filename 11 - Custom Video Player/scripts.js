const player = document.querySelector(".player");
const video = document.querySelector(".player__video");
const playButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll(".player__button");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll(".player__slider");


function videoPlay(){
    const method = video.paused ? "play" : "pause";
    video[method]();
}

function iconToggle(){
    const icon = this.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
}

function skipPlay(){
    video.currentTime += +this.dataset.skip;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function handleRange(){
    video[this.name] = this.value;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


video.addEventListener("click",videoPlay);
video.addEventListener("play", iconToggle);
video.addEventListener("pause", iconToggle);
playButton.addEventListener("click", videoPlay);
skipButtons.forEach(button => button.addEventListener('click', skipPlay));
video.addEventListener('timeupdate', handleProgress);
ranges.forEach(range => range.addEventListener("change",handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener("mousemove",(e) =>{
    if (mousedown) {
        scrub(e);
      }
});
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup",() => mousedown = false);