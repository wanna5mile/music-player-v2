const MUSIC_API_URL = "https://script.google.com/macros/s/PASTE_YOUR_DEPLOYED_EXEC_URL_HERE/exec";

let flat_music_list = [];

async function loadMusicList() {
  try {
    const response = await fetch(MUSIC_API_URL + "?cb=" + Date.now());
    const tracks = await response.json();

    if (!Array.isArray(tracks)) throw new Error("Invalid JSON structure");

    // Convert into format your player expects
    flat_music_list = tracks.map((t, i) => ({
      name: t.title,
      artist: "Unknown Artist",
      url: "#",
      artistUrl: "#",
      img: "./images/cover-default.jpg",
      musicSrc: t.mp3Link,
      isMultiPart: false,
      partIndex: 0,
      originalIndex: i,
      lastPartIndex: 0
    }));

    // Load first track
    loadTrack(0);
  } catch (err) {
    console.error("Failed to load music list:", err);
  }
}

// Wait until DOM ready, then fetch
document.addEventListener("DOMContentLoaded", loadMusicList);
