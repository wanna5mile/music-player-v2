/* ==========================================================
   WannaSmile | Dynamic Music Loader (GitHub → Google Sheets → Player)
   ========================================================== */

const MUSIC_API_URL = "https://script.google.com/macros/s/AKfycbw4lb6HDjV4d4p3f-mTV8llBnM4YnIwmy7iLeYUfe4Vsneh48Pq6Hll4y_hoIeIqDF6pg/exec";

let flat_music_list = [];

/* ---------------------------
   Fetch & Build Music List
   --------------------------- */
async function loadMusicList() {
  try {
    console.log("🎶 Fetching music data...");
    const response = await fetch(`${MUSIC_API_URL}?cb=${Date.now()}`, { cache: "no-store" });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const tracks = await response.json();
    if (!Array.isArray(tracks) || tracks.length === 0) {
      console.warn("⚠️ No MP3 tracks found from API");
      return;
    }

    // Normalize Google Sheet entries → Player format
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
      lastPartIndex: 0,
    }));

    console.log(`🎵 Loaded ${flat_music_list.length} tracks from API`);

    // Load first track if player exists
    if (typeof loadTrack === "function") {
      loadTrack(0);
    } else {
      console.warn("⚠️ loadTrack() not found — ensure music-player.js is loaded before this script");
    }
  } catch (err) {
    console.error("❌ Failed to load music list:", err);
  }
}

/* ---------------------------
   Init on DOM Ready
   --------------------------- */
document.addEventListener("DOMContentLoaded", loadMusicList);
