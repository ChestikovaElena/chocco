(function () {
  const video = document.querySelector('#video-player');
  const durationControl = document.querySelector('#durationLevel');
  const soundControl = document.querySelector('#micLevel');

  const playButtonVideo = document.querySelector(".video__player-img");

  let intervalId;
  let soundLevel;
  const MAX_SOUND_VALUE = 10;
  const NORMAL_UPDATE_RANGE = 1000 / 66;

  document.addEventListener("DOMContentLoaded", function() {

    video.addEventListener('canplaythrough', ()=>{
      durationControl.max = video.duration;
    });

    durationControl.min = 0;
    durationControl.value = 0;

    soundControl.min = 0;
    soundControl.max = MAX_SOUND_VALUE;
    video.volume = 0.5;
    soundControl.value = video.volume * MAX_SOUND_VALUE;
    initPlayButton();
    addListener();
  });

  function initPlayButton() {
    const playButtons = document.querySelectorAll(".play");
    
    playButtons.forEach(button => button.addEventListener("click",playStop));

    const micControl = document.querySelector("#mic");
    micControl.addEventListener("click", soundOff);
  }

  function addListener() {

    video.addEventListener('click', playStop);
    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval);
    soundControl.addEventListener('click', changeSoundVolume);

  }

  function playStop() {
    //video.webkitRequestFullScreen(); 
    playButtonVideo.classList.toggle("video__player-img--hidden");
    const playButtonGrey = document.querySelector(".duration__img");
    
    if (video.paused) {
      intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE);
      video.play();
      playButtonGrey.classList.add("duration__img--paused");
    } else if (playButtonGrey.classList.contains("duration__img--paused")) {
      stopInterval();
      playButtonGrey.classList.remove("duration__img--paused");
    }
  }

  function updateDuration() {
    durationControl.value = video.currentTime;
  }

  function setVideoDuration() {
    intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE);
    video.currentTime = durationControl.value;
    
    if (video.paused) {
      playButtonVideo.classList.add("video__player-img--hidden");
      video.play();
    } 
  }

  function stopInterval() {
    
    video.pause();
    clearInterval(intervalId);
  }

  function soundOff() {
    const volumeIcon = document.querySelector(".sound__img");

    if (video.volume === 0) {
      
      video.volume = soundLevel;
      soundControl.value = soundLevel * MAX_SOUND_VALUE;
      volumeIcon.classList.remove("sound__img--off");
    } else {
      soundLevel = video.volume;
      video.volume = 0;
      soundControl.value = 0;
      volumeIcon.classList.add("sound__img--off");
      
    }
  }

  function changeSoundVolume() {
    video.volume = soundControl.value / MAX_SOUND_VALUE;
  }
})()