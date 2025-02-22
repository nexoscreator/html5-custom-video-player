document.addEventListener('DOMContentLoaded', function () {
  const videoContainer = document.querySelector('.nex-video-player');
  const videoSrc = videoContainer.getAttribute('data-src');
  const videoTitle = videoContainer.getAttribute('data-title');

  // Create the video element
  const videoElement = document.createElement('video');
  videoElement.id = 'video';
  videoElement.disableRemotePlayback = true;
  videoElement.setAttribute('disableRemotePlayback', '');
  videoElement.src = videoSrc;
  videoContainer.appendChild(videoElement);

  // Create a new <span> element for the loader
  const loaderspn = document.createElement('span');
  loaderspn.className = 'custom-loader';
  videoContainer.appendChild(loaderspn);

  // Create the player state container <div>
  const playerState = document.createElement('div');
  playerState.className = 'player-state';

  // Create and configure the backward button
  const backwardButton = document.createElement('span');
  backwardButton.className = 'state-btn state-backward';
  backwardButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 145.52v221c0 13.28-13 21.72-23.63 15.35L267.5 268.8c-9.24-5.53-9.24-20.07 0-25.6l188.87-113C467 123.8 480 132.24 480 145.52zM251.43 145.52v221c0 13.28-13 21.72-23.63 15.35L38.93 268.8c-9.24-5.53-9.24-20.07 0-25.6l188.87-113c10.64-6.4 23.63 2.04 23.63 15.32z"/></svg>`;
  playerState.appendChild(backwardButton);

  // Create and configure the main play/pause button
  const mainStateButton = document.createElement('span');
  mainStateButton.className = 'state-btn main-state';
  mainStateButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"/></svg>`;
  playerState.appendChild(mainStateButton);

  // Create and configure the forward button
  const forwardButton = document.createElement('span');
  forwardButton.className = 'state-btn state-forward';
  forwardButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 18A6 6 0 1 1 9 6h11m-7 14h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-2v-3h3"/><path d="m17 9l3-3l-3-3"/></g></svg>`;
  playerState.appendChild(forwardButton);

  // Append buttons to player state container
  videoContainer.appendChild(playerState);

  // Create the controls container <div>
  const controlsdiv = document.createElement('div');
  controlsdiv.className = 'controls';

  // Set the video info
  const videoinfo = document.createElement('div');
  videoinfo.className = 'video-info';
  controlsdiv.appendChild(videoinfo);

  // Set the video title
  const videotitle = document.createElement('h2');
  videotitle.className = 'video-title';
  videotitle.textContent = videoTitle;
  videoinfo.appendChild(videotitle);

  // Create and configure the duration container
  const videotimer = document.createElement('div');
  videotimer.className = 'time-container';
  videotimer.innerHTML = `<span class="current-duration">00:00</span><span> / </span><span class="total-duration">00:00</span>`;
  videoinfo.appendChild(videotimer);

  // Create and configure the duration container
  const durationDiv = document.createElement('div');
  durationDiv.className = 'progress-bar';
  durationDiv.innerHTML = `<div class="current-time"></div><div class="hover-time"><span class="hover-duration"></span></div><div class="buffer"></div>`;
  controlsdiv.appendChild(durationDiv);

  // Create and configure the button controls container
  const btnControls = document.createElement('div');
  btnControls.className = 'btn-controls';
  btnControls.innerHTML = `
  <div class="left-controls">
    <span class="play-pause control-btn" title="play"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"/></svg></span>
    <span class="backward control-btn" title="5 backward"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 145.52v221c0 13.28-13 21.72-23.63 15.35L267.5 268.8c-9.24-5.53-9.24-20.07 0-25.6l188.87-113C467 123.8 480 132.24 480 145.52zM251.43 145.52v221c0 13.28-13 21.72-23.63 15.35L38.93 268.8c-9.24-5.53-9.24-20.07 0-25.6l188.87-113c10.64-6.4 23.63 2.04 23.63 15.32z"/></svg></span>
    <span class="forward control-btn" title="5 forward"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 145.52v221c0 13.28 13 21.72 23.63 15.35l188.87-113c9.24-5.53 9.24-20.07 0-25.6l-188.87-113C45 123.8 32 132.24 32 145.52zM260.57 145.52v221c0 13.28 13 21.72 23.63 15.35l188.87-113c9.24-5.53 9.24-20.07 0-25.6l-188.87-113c-10.64-6.47-23.63 1.97-23.63 15.25z"/></svg></span>
    <span class="volume">
      <span class="mute-unmute control-btn" title="mute"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160"/></svg></span>
      <div class="max-vol">
        <span class="current-vol"></span>
      </div>
    </span>
  </div>
  <div class="right-controls">
    <span class="mini-player control-btn" title="mini player"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="64" y="176" width="384" height="256" rx="28.87" ry="28.87"/><path d="M144 80h224M112 128h288"/></svg></span>
    <span class="settings control-btn" title="settings">
      <svg class="setting-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/><circle cx="336" cy="128" r="32"/><circle cx="176" cy="256" r="32"/><circle cx="336" cy="384" r="32"/></svg>
      <ul class="setting-menu"><li data-value="0.25">0.25x</li><li data-value="0.5">0.5x</li><li data-value="0.75">0.75x</li><li data-value="1" class="speed-active">1x</li><li data-value="1.25">1.25x</li><li data-value="1.5">1.5x</li><li data-value="1.75">1.75x</li><li data-value="2">2x</li></ul>
    </span>
    <span class="theater-btn control-btn" title="theater">
      <svg class="theater-default" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="80" y="16" width="352" height="480" rx="48" ry="48" transform="rotate(-90 256 256)"/></svg>
      <svg class="theater-active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32" y="96" width="448" height="272" rx="32.14" ry="32.14"/><path d="M128 416h256"/></svg>
    </span>
    <span class="fullscreen-btn control-btn" title="fullscreen">
      <svg class="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336 448h56a56 56 0 0056-56v-56M448 176v-56a56 56 0 00-56-56h-56M176 448h-56a56 56 0 01-56-56v-56M64 176v-56a56 56 0 0156-56h56"/></svg>
      <svg class="contract" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 416V304h112M314.2 314.23L432 432M208 96v112H96M197.8 197.77L80 80M416 208H304V96M314.23 197.8L432 80M96 304h112v112M197.77 314.2L80 432"/></svg>
    </span>
  </div>`;
  controlsdiv.appendChild(btnControls);

  // Append the duration and button controls to the controls container
  videoContainer.appendChild(controlsdiv);

  const video = document.querySelector("video");
  const fullscreen = document.querySelector(".fullscreen-btn");
  const playPause = document.querySelector(".play-pause");
  const volume = document.querySelector(".volume");
  const currentTime = document.querySelector(".current-time");
  const duration = document.querySelector(".progress-bar");
  const buffer = document.querySelector(".buffer");
  const totalDuration = document.querySelector(".total-duration");
  const currentDuration = document.querySelector(".current-duration");
  const controls = document.querySelector(".controls");
  const currentVol = document.querySelector(".current-vol");
  const totalVol = document.querySelector(".max-vol");
  const mainState = document.querySelector(".main-state");
  const muteUnmute = document.querySelector(".mute-unmute");
  const forward = document.querySelector(".forward");
  const backward = document.querySelector(".backward");
  const hoverTime = document.querySelector(".hover-time");
  const hoverDuration = document.querySelector(".hover-duration");
  const miniPlayer = document.querySelector(".mini-player");
  const settingsBtn = document.querySelector(".setting-btn");
  const settingMenu = document.querySelector(".setting-menu");
  const theaterBtn = document.querySelector(".theater-btn");
  const speedButtons = document.querySelectorAll(".setting-menu li");
  const backwardSate = document.querySelector(".state-backward");
  const forwardSate = document.querySelector(".state-forward");
  const loader = document.querySelector(".custom-loader");

  let isPlaying = false,
    mouseDownProgress = false,
    mouseDownVol = false,
    isCursorOnControls = false,
    muted = false,
    timeout,
    volumeVal = 1,
    mouseOverDuration = false,
    touchClientX = 0,
    touchPastDurationWidth = 0,
    touchStartTime = 0;

  currentVol.style.width = volumeVal * 100 + "%";

  // Video Event Listeners
  video.addEventListener("loadedmetadata", canPlayInit);
  video.addEventListener("play", play);
  video.addEventListener("pause", pause);
  video.addEventListener("progress", handleProgress);
  video.addEventListener("waiting", handleWaiting);
  video.addEventListener("playing", handlePlaying);

  document.addEventListener("keydown", handleShorthand);
  fullscreen.addEventListener("click", toggleFullscreen);

  playPause.addEventListener("click", (e) => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  });

  duration.addEventListener("click", navigate);

  duration.addEventListener("mousedown", (e) => {
    mouseDownProgress = true;
    navigate(e);
  });

  totalVol.addEventListener("mousedown", (e) => {
    mouseDownVol = true;
    handleVolume(e);
  });

  document.addEventListener("mouseup", (e) => {
    mouseDownProgress = false;
    mouseDownVol = false;
  });

  document.addEventListener("mousemove", handleMousemove);

  duration.addEventListener("mouseenter", (e) => {
    mouseOverDuration = true;
  });
  duration.addEventListener("mouseleave", (e) => {
    mouseOverDuration = false;
    hoverTime.style.width = 0;
    hoverDuration.innerHTML = "";
  });

  videoContainer.addEventListener("click", toggleMainState);
  videoContainer.addEventListener("fullscreenchange", () => {
    videoContainer.classList.toggle("fullscreen", document.fullscreenElement);
  });
  videoContainer.addEventListener("mouseleave", hideControls);
  videoContainer.addEventListener("mousemove", (e) => {
    controls.classList.add("show-controls");
    hideControls();
  });
  videoContainer.addEventListener("touchstart", (e) => {
    controls.classList.add("show-controls");
    touchClientX = e.changedTouches[0].clientX;
    const currentTimeRect = currentTime.getBoundingClientRect();
    touchPastDurationWidth = currentTimeRect.width;
    touchStartTime = e.timeStamp;
  });
  videoContainer.addEventListener("touchend", () => {
    hideControls();
    touchClientX = 0;
    touchPastDurationWidth = 0;
    touchStartTime = 0;
  });
  videoContainer.addEventListener("touchmove", handleTouchNavigate);

  controls.addEventListener("mouseenter", (e) => {
    controls.classList.add("show-controls");
    isCursorOnControls = true;
  });

  controls.addEventListener("mouseleave", (e) => {
    isCursorOnControls = false;
  });

  mainState.addEventListener("click", toggleMainState);

  mainState.addEventListener("animationend", handleMainSateAnimationEnd);

  muteUnmute.addEventListener("click", toggleMuteUnmute);

  muteUnmute.addEventListener("mouseenter", (e) => {
    if (!muted) {
      totalVol.classList.add("show");
    } else {
      totalVol.classList.remove("show");
    }
  });

  muteUnmute.addEventListener("mouseleave", (e) => {
    if (e.relatedTarget != volume) {
      totalVol.classList.remove("show");
    }
  });

  forward.addEventListener("click", handleForward);

  forwardSate.addEventListener("animationend", () => {
    forwardSate.classList.remove("show-state");
    forwardSate.classList.remove("animate-state");
  });

  backward.addEventListener("click", handleBackward);

  backwardSate.addEventListener("animationend", () => {
    backwardSate.classList.remove("show-state");
    backwardSate.classList.remove("animate-state");
  });

  miniPlayer.addEventListener("click", toggleMiniPlayer);

  theaterBtn.addEventListener("click", toggleTheater);

  settingsBtn.addEventListener("click", handleSettingMenu);

  speedButtons.forEach((btn) => {
    btn.addEventListener("click", handlePlaybackRate);
  });

  function canPlayInit() {
    totalDuration.innerHTML = showDuration(video.duration);
    video.volume = volumeVal;
    muted = video.muted;
    if (video.paused) {
      controls.classList.add("show-controls");
      mainState.classList.add("show-state");
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"/></svg>`);
    }
  }

  function play() {
    video.play();
    isPlaying = true;
    playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M176 96h16v320h-16zM320 96h16v320h-16z"/></svg>`;
    mainState.classList.remove("show-state");
    handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M176 96h16v320h-16zM320 96h16v320h-16z"/></svg>`);
    watchProgress();
  }

  function watchProgress() {
    if (isPlaying) {
      requestAnimationFrame(watchProgress);
      handleProgressBar();
    }
  }

  video.ontimeupdate = handleProgressBar;

  function handleProgressBar() {
    currentTime.style.width = (video.currentTime / video.duration) * 100 + "%";
    currentDuration.innerHTML = showDuration(video.currentTime);
  }

  function pause() {
    video.pause();
    isPlaying = false;
    playPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"/></svg>`;
    controls.classList.add("show-controls");
    mainState.classList.add("show-state");
    handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"/></svg>`);
    if (video.ended) {
      currentTime.style.width = 100 + "%";
    }
  }

  function handleWaiting() {
    loader.style.display = "unset";
  }

  function handlePlaying() {
    loader.style.display = "none";
  }

  function navigate(e) {
    const totalDurationRect = duration.getBoundingClientRect();
    const width = Math.min(
      Math.max(0, e.clientX - totalDurationRect.x),
      totalDurationRect.width
    );
    currentTime.style.width = (width / totalDurationRect.width) * 100 + "%";
    video.currentTime = (width / totalDurationRect.width) * video.duration;
  }

  function handleTouchNavigate(e) {
    hideControls();
    if (e.timeStamp - touchStartTime > 500) {
      const durationRect = duration.getBoundingClientRect();
      const clientX = e.changedTouches[0].clientX;
      const value = Math.min(
        Math.max(0, touchPastDurationWidth + (clientX - touchClientX) * 0.2),
        durationRect.width
      );
      currentTime.style.width = value + "px";
      video.currentTime = (value / durationRect.width) * video.duration;
      currentDuration.innerHTML = showDuration(video.currentTime);
    }
  }

  function showDuration(time) {
    const hours = Math.floor(time / 60 ** 2);
    const min = Math.floor((time / 60) % 60);
    const sec = Math.floor(time % 60);
    if (hours > 0) {
      return `${formatter(hours)}:${formatter(min)}:${formatter(sec)}`;
    } else {
      return `${formatter(min)}:${formatter(sec)}`;
    }
  }

  function formatter(number) {
    return new Intl.NumberFormat({}, { minimumIntegerDigits: 2 }).format(number);
  }

  function toggleMuteUnmute() {
    if (!muted) {
      video.volume = 0;
      muted = true;
      muteUnmute.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 432L64 80"/><path d="M224 136.92v33.8a4 4 0 001.17 2.82l24 24a4 4 0 006.83-2.82v-74.15a24.53 24.53 0 00-12.67-21.72 23.91 23.91 0 00-25.55 1.83 8.27 8.27 0 00-.66.51l-31.94 26.15a4 4 0 00-.29 5.92l17.05 17.06a4 4 0 005.37.26zM224 375.08l-78.07-63.92a32 32 0 00-20.28-7.16H64v-96h50.72a4 4 0 002.82-6.83l-24-24a4 4 0 00-2.82-1.17H56a24 24 0 00-24 24v112a24 24 0 0024 24h69.76l91.36 74.8a8.27 8.27 0 00.66.51 23.93 23.93 0 0025.85 1.69A24.49 24.49 0 00256 391.45v-50.17a4 4 0 00-1.17-2.82l-24-24a4 4 0 00-6.83 2.82zM125.82 336zM352 256c0-24.56-5.81-47.88-17.75-71.27a16 16 0 00-28.5 14.54C315.34 218.06 320 236.62 320 256q0 4-.31 8.13a8 8 0 002.32 6.25l19.66 19.67a4 4 0 006.75-2A146.89 146.89 0 00352 256zM416 256c0-51.19-13.08-83.89-34.18-120.06a16 16 0 00-27.64 16.12C373.07 184.44 384 211.83 384 256c0 23.83-3.29 42.88-9.37 60.65a8 8 0 001.9 8.26l16.77 16.76a4 4 0 006.52-1.27C410.09 315.88 416 289.91 416 256z"/><path d="M480 256c0-74.26-20.19-121.11-50.51-168.61a16 16 0 10-27 17.22C429.82 147.38 448 189.5 448 256c0 47.45-8.9 82.12-23.59 113a4 4 0 00.77 4.55L443 391.39a4 4 0 006.4-1C470.88 348.22 480 307 480 256z"/></svg>`;
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 432L64 80"/><path d="M224 136.92v33.8a4 4 0 001.17 2.82l24 24a4 4 0 006.83-2.82v-74.15a24.53 24.53 0 00-12.67-21.72 23.91 23.91 0 00-25.55 1.83 8.27 8.27 0 00-.66.51l-31.94 26.15a4 4 0 00-.29 5.92l17.05 17.06a4 4 0 005.37.26zM224 375.08l-78.07-63.92a32 32 0 00-20.28-7.16H64v-96h50.72a4 4 0 002.82-6.83l-24-24a4 4 0 00-2.82-1.17H56a24 24 0 00-24 24v112a24 24 0 0024 24h69.76l91.36 74.8a8.27 8.27 0 00.66.51 23.93 23.93 0 0025.85 1.69A24.49 24.49 0 00256 391.45v-50.17a4 4 0 00-1.17-2.82l-24-24a4 4 0 00-6.83 2.82zM125.82 336zM352 256c0-24.56-5.81-47.88-17.75-71.27a16 16 0 00-28.5 14.54C315.34 218.06 320 236.62 320 256q0 4-.31 8.13a8 8 0 002.32 6.25l19.66 19.67a4 4 0 006.75-2A146.89 146.89 0 00352 256zM416 256c0-51.19-13.08-83.89-34.18-120.06a16 16 0 00-27.64 16.12C373.07 184.44 384 211.83 384 256c0 23.83-3.29 42.88-9.37 60.65a8 8 0 001.9 8.26l16.77 16.76a4 4 0 006.52-1.27C410.09 315.88 416 289.91 416 256z"/><path d="M480 256c0-74.26-20.19-121.11-50.51-168.61a16 16 0 10-27 17.22C429.82 147.38 448 189.5 448 256c0 47.45-8.9 82.12-23.59 113a4 4 0 00.77 4.55L443 391.39a4 4 0 006.4-1C470.88 348.22 480 307 480 256z"/></svg>`);
      totalVol.classList.remove("show");
    } else {
      video.volume = volumeVal;
      muted = false;
      totalVol.classList.add("show");
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160"/></svg>`);
      muteUnmute.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160"/></svg>`;
    }
  }

  function hideControls() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (isPlaying && !isCursorOnControls) {
        controls.classList.remove("show-controls");
        settingMenu.classList.remove("show-setting-menu");
      }
    }, 1000);
  }

  function toggleMainState(e) {
    e.stopPropagation();
    const path = e.composedPath(); // Get the event path

    if (!path.includes(controls)) {
      if (!isPlaying) {
        play();
      } else {
        pause();
      }
    }
  }

  function handleVolume(e) {
    const totalVolRect = totalVol.getBoundingClientRect();
    currentVol.style.width =
      Math.min(Math.max(0, e.clientX - totalVolRect.x), totalVolRect.width) +
      "px";
    volumeVal = Math.min(
      Math.max(0, (e.clientX - totalVolRect.x) / totalVolRect.width),
      1
    );
    video.volume = volumeVal;
  }

  function handleProgress() {
    if (!video.buffered || !video.buffered.length) {
      return;
    }
    const width = (video.buffered.end(0) / video.duration) * 100 + "%";
    buffer.style.width = width;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336 448h56a56 56 0 0056-56v-56M448 176v-56a56 56 0 00-56-56h-56M176 448h-56a56 56 0 01-56-56v-56M64 176v-56a56 56 0 0156-56h56"/></svg>`);
    } else {
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 416V304h112M314.2 314.23L432 432M208 96v112H96M197.8 197.77L80 80M416 208H304V96M314.23 197.8L432 80M96 304h112v112M197.77 314.2L80 432"/></svg>`);
      document.exitFullscreen();
    }
  }

  function handleMousemove(e) {
    if (mouseDownProgress) {
      e.preventDefault();
      navigate(e);
    }
    if (mouseDownVol) {
      handleVolume(e);
    }
    if (mouseOverDuration) {
      const rect = duration.getBoundingClientRect();
      const width = Math.min(Math.max(0, e.clientX - rect.x), rect.width);
      const percent = (width / rect.width) * 100;
      hoverTime.style.width = width + "px";
      hoverDuration.innerHTML = showDuration((video.duration / 100) * percent);
    }
  }

  function handleForward() {
    forwardSate.classList.add("show-state");
    forwardSate.classList.add("animate-state");
    video.currentTime += 5;
    handleProgressBar();
  }

  function handleBackward() {
    backwardSate.classList.add("show-state");
    backwardSate.classList.add("animate-state");
    video.currentTime -= 5;
    handleProgressBar();
  }

  function handleMainStateIcon(icon) {
    mainState.classList.add("animate-state");
    mainState.innerHTML = icon;
  }

  function handleMainSateAnimationEnd() {
    mainState.classList.remove("animate-state");
    if (!isPlaying) {
      mainState.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"/></svg>`;
    }
    if (document.pictureInPictureElement) {
      mainState.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32" y="96" width="448" height="272" rx="32.14" ry="32.14"/><path d="M128 416h256"/></svg>`;
    }
  }

  function toggleTheater() {
    videoContainer.classList.toggle("theater");
    if (videoContainer.classList.contains("theater")) {
      handleMainStateIcon(
        `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="80" y="16" width="352" height="480" rx="48" ry="48" transform="rotate(-90 256 256)"/></svg>`
      );
    } else {
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32" y="96" width="448" height="272" rx="32.14" ry="32.14"/><path d="M128 416h256"/></svg>`);
    }
  }

  function toggleMiniPlayer() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M421.83 293.82A144 144 0 00218.18 90.17M353.94 225.94a48 48 0 00-67.88-67.88"/><path d="M192 464v-48M90.18 421.82l33.94-33.94M48 320h48"/><path d="M286.06 158.06L172.92 271.19a32 32 0 01-45.25 0L105 248.57a32 32 0 010-45.26L218.18 90.17M421.83 293.82L308.69 407a32 32 0 01-45.26 0l-22.62-22.63a32 32 0 010-45.26l113.13-113.17M139.6 169.98l67.88 67.89M275.36 305.75l67.89 67.88"/></svg>`);
    } else {
      video.requestPictureInPicture();
      handleMainStateIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="64" y="176" width="384" height="256" rx="28.87" ry="28.87"/><path d="M144 80h224M112 128h288"/></svg>`);
    }
  }

  function handleSettingMenu() {
    settingMenu.classList.toggle("show-setting-menu");
  }

  function handlePlaybackRate(e) {
    video.playbackRate = parseFloat(e.target.dataset.value);
    speedButtons.forEach((btn) => {
      btn.classList.remove("speed-active");
    });
    e.target.classList.add("speed-active");
    settingMenu.classList.remove("show-setting-menu");
  }

  function handlePlaybackRateKey(type = "") {
    if (type === "increase" && video.playbackRate < 2) {
      video.playbackRate += 0.25;
    } else if (video.playbackRate > 0.25 && type !== "increase") {
      video.playbackRate -= 0.25;
    }
    handleMainStateIcon(
      `<span style="font-size: 1.4rem">${video.playbackRate}x</span>`
    );
    speedButtons.forEach((btn) => {
      btn.classList.remove("speed-active");
      if (btn.dataset.value == video.playbackRate) {
        btn.classList.add("speed-active");
      }
    });
  }

  function handleShorthand(e) {
    const tagName = document.activeElement.tagName.toLowerCase();
    if (tagName === "input") return;
    if (e.key.match(/[0-9]/gi)) {
      video.currentTime = (video.duration / 100) * (parseInt(e.key) * 10);
      currentTime.style.width = parseInt(e.key) * 10 + "%";
    }
    switch (e.key.toLowerCase()) {
      case " ":
        if (tagName === "button") return;
        if (isPlaying) {
          video.pause();
        } else {
          video.play();
        }
        break;
      case "f":
        toggleFullscreen();
        break;
      case "arrowright":
        handleForward();
        break;
      case "arrowleft":
        handleBackward();
        break;
      case "t":
        toggleTheater();
        break;
      case "i":
        toggleMiniPlayer();
        break;
      case "m":
        toggleMuteUnmute();
        break;
      case "+":
        handlePlaybackRateKey("increase");
        break;
      case "-":
        handlePlaybackRateKey();
        break;

      default:
        break;
    }
  }

});