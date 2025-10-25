// ====== Music Player v2 - GitHub MP3 API ======
const MUSIC_API_URL = "https://script.google.com/macros/s/AKfycbw6ozFOqTPaw2pjUOumQ6Xj_7uEghVH7930wdu7ur4BVvAGSkNOp_OKzxk-XnGuvEdF/exec";

let flat_music_list = [];

async function loadMusicList() {
  try {
    const response = await fetch(MUSIC_API_URL + "?cb=" + Date.now(), { cache: "no-store" });
    const tracks = await response.json();

    if (!Array.isArray(tracks)) throw new Error("Invalid JSON structure");

    // Convert into format your player expects
    flat_music_list = tracks.map((t, i) => ({
      name: t.title || "Untitled Track",
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
    if (typeof loadTrack === "function") {
      loadTrack(0);
      console.log(`🎧 Loaded ${flat_music_list.length} tracks`);
    } else {
      console.warn("loadTrack() not found — make sure player is initialized");
    }
  } catch (err) {
    console.error("Failed to load music list:", err);
  }
}

// Wait until DOM ready, then fetch
document.addEventListener("DOMContentLoaded", loadMusicList);
