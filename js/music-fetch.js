// ====== Dynamic Music Loader ======
const MUSIC_API_URL = "https://script.google.com/macros/s/AKfycbw6ozFOqTPaw2pjUOumQ6Xj_7uEghVH7930wdu7ur4BVvAGSkNOp_OKzxk-XnGuvEdF/exec";

let flat_music_list = [];

async function loadMusicList() {
  try {
    // Fetch live music data (Google Apps Script endpoint)
    const response = await fetch(MUSIC_API_URL + "?cb=" + Date.now(), { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const tracks = await response.json();

    if (!Array.isArray(tracks) || tracks.length === 0) {
      console.warn("No tracks found from API");
      return;
    }

    // Convert Google Sheet JSON → player track objects
    flat_music_list = tracks.map((t, i) => ({
      name: t.name || t.title || "Untitled Track",
      artist: t.artist || "Unknown Artist",
      artistUrl: t.artistUrl || "#",
      img: t.cover || t.coverUrl || "./images/cover-default.jpg",
      musicSrc: t.url || t.mp3Link || "",
      url: "#",
      isMultiPart: false,
      partIndex: 0,
      originalIndex: i,
      lastPartIndex: 0
    }));

    console.log(`🎵 Loaded ${flat_music_list.length} tracks from API`);

    // Load first track (only if player logic is present)
    if (typeof loadTrack === "function") {
      loadTrack(0);
    } else {
      console.warn("loadTrack() not found — verify music-player.js is loaded");
    }
  } catch (err) {
    console.error("Failed to load music list:", err);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", loadMusicList);
