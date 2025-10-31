/* ==========================================================
   WannaSmile | Music Player v2 — GitHub MP3 API Integration
   ========================================================== */

const MUSIC_API_URL = "https://script.google.com/macros/s/AKfycbw4lb6HDjV4d4p3f-mTV8llBnM4YnIwmy7iLeYUfe4Vsneh48Pq6Hll4y_hoIeIqDF6pg/exec";

let flat_music_list = [];

/* ---------------------------
   Load and Prepare Track Data
   --------------------------- */
async function loadMusicList() {
  try {
    console.log("🎧 Fetching music list from API...");
    const response = await fetch(`${MUSIC_API_URL}?cb=${Date.now()}`, { cache: "no-store" });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const tracks = await response.json();

    if (!Array.isArray(tracks) || tracks.length === 0) {
      console.warn("⚠️ No valid music data received.");
      return;
    }

    // Convert JSON → player-friendly format
    flat_music_list = tracks.map((t, i) => ({
      name: t.title || t.name || "Untitled Track",
      artist: t.artist || "Unknown Artist",
      url: "#",
      artistUrl: "#",
      img: "./images/cover-default.jpg",
      musicSrc: t.mp3Link || t.url || "",
      isMultiPart: false,
      partIndex: 0,
      originalIndex: i,
      lastPartIndex: 0,
    }));

    // Load first track into the player
    if (typeof loadTrack === "function") {
      loadTrack(0);
      console.log(`🎵 Loaded ${flat_music_list.length} tracks from API`);
    } else {
      console.warn("⚠️ loadTrack() not found — make sure player core script is loaded first.");
    }
  } catch (err) {
    console.error("❌ Failed to load music list:", err);
  }
}

/* ---------------------------
   Init When DOM Is Ready
   --------------------------- */
document.addEventListener("DOMContentLoaded", loadMusicList);
