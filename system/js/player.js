document.addEventListener("DOMContentLoaded", () => {
  console.log("Music Player v2 ready.");

  // Example: toggle play/pause icon
  const playBtn = document.querySelector(".playpause i");
  playBtn.addEventListener("click", () => {
    if (playBtn.classList.contains("fa-play-circle")) {
      playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
    } else {
      playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    }
  });
});
