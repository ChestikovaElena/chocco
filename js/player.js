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
  
  console.log(playButtonVideo);
  console.log(video);

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
  console.log(video);
  video.pause();
  clearInterval(intervalId);
}

function soundOff() {
  const volumeIcon = document.querySelector(".sound__img");

  if (video.volume === 0) {
    console.log('on');
    video.volume = soundLevel;
    soundControl.value = soundLevel * MAX_SOUND_VALUE;
    volumeIcon.classList.remove("sound__img--off");
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    volumeIcon.classList.add("sound__img--off");
    console.log('off');
  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / MAX_SOUND_VALUE;
}

// let player;
// const playerContainer = $('.player');

// let eventsInit = () => {
//   $(".player__start").click(e => {
//     e.preventDefault();
  
//     if (playerContainer.hasClass('paused')) {
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
    
//   });

//   $(".player__playback").click(e => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;
//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

//     $(".player__playback-button").css({
//       left: `${newButtonPositionPercent}%`
//     });

//     player.seekTo(newPlaybackPositionSec);
//   });

//   $(".player__splash").click(e => {
//     player.playVideo();
//   })

//   $(".player__volume-img").click(e => {
//     const volumeIcon = $(e.target);

//     if (volumeIcon.hasClass('active')) {
//       player.unMute();
//       $(e.currentTarget).removeClass("active");
//     } else {
//       player.mute();
//       $(e.currentTarget).addClass("active");
//     }
//   })

//   $(".player__volume-wrap").click(e => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;
//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newButtonPositionVal = Math.floor(newButtonPositionPercent);

//     $(".player__volume-button").css({
//       left: `${newButtonPositionVal}%`
//     });

//     player.setVolume(newButtonPositionVal);
//   })
// }

// // const formatTime = timeSec => {
// //   const roundTime = Math.round(timeSec);
  
// //   const minutes = addZero(Math.floor(roundTime / 60));
// //   const seconds = addZero(roundTime - minutes * 60);
  
// //   function addZero(num) {
// //     return num < 10 ? `0${num}` : num;
// //   }
  
// //   return `${minutes} : ${seconds}`;
// // };

// const onPlayerReady = () => {
//   let interval;
//   const durationSec = player.getDuration();

//   // $(".player__duration-estimated").text(formatTime(durationSec));

//   if (typeof interval !== 'undefined') {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;

//     $(".player__playback-button").css({
//       left: `${completedPercent}%`
//     });

//   //   $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// }

// const onPlayerStateChange = e => {
//   /*
//      -1 (воспроизведение видео не начато)
//       0 (воспроизведение видео завершено)
//       1 (воспроизведение)
//       2 (пауза)
//       3 (буферизация)
//       5 (видео подают реплики).
//   */
//   switch (e.data) {
//     case 1:
//       playerContainer.addClass('active');
//       playerContainer.addClass("paused");
//       break;

//     case 2:
//       playerContainer.removeClass('active');
//       playerContainer.removeClass("paused");
//       break;
//   }
// }

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('yt-player', {
//     height: '405',
//     width: '660',
//     videoId: 'JZh6hCMc-cU',
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 0,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0
//     }
//   });
// }

// eventsInit();