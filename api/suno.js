const PROFILE = "millertperez";
const PROFILE_API = `https://studio-api.prod.suno.com/api/profiles/${PROFILE}`;
const PAGE_SIZE = 20;
const MAX_PAGES = 50;

const SUNO_HEADERS = {
  Accept: "application/json",
  "User-Agent": "Mozilla/5.0 (compatible; AJPortfolioMusicSync/1.0)",
};

async function fetchProfilePage(page) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const url = `${PROFILE_API}?playlists_sort_by=created_at&clips_sort_by=created_at&page=${page}`;

  try {
    const response = await fetch(url, {
      headers: SUNO_HEADERS,
      signal: controller.signal,
      redirect: "error",
    });

    if (!response.ok) throw new Error(`Suno returned ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function mapSong(clip) {
  const metadata = clip.metadata || {};
  return {
    id: clip.id,
    title: clip.title || "Untitled",
    url: `https://suno.com/song/${clip.id}`,
    image: clip.image_large_url || clip.image_url || "",
    audio: clip.audio_url || "",
    plays: clip.play_count ?? 0,
    likes: clip.upvote_count ?? 0,
    duration: metadata.duration ?? clip.duration ?? null,
    created: clip.created_at || null,
  };
}

function mapPlaylist(playlist) {
  return {
    id: playlist.id,
    title: playlist.name || "Untitled playlist",
    url: `https://suno.com/playlist/${playlist.id}`,
    image: playlist.image_url || "",
    count: playlist.num_total_results ?? playlist.song_count ?? 0,
    plays: playlist.play_count ?? 0,
  };
}

function sendJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(status).json(payload);
}

export default async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.setHeader("Allow", "GET");
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const firstPage = await fetchProfilePage(1);
    const reportedTotal = Number(firstPage.num_total_clips) || 0;
    const pageCount = Math.min(MAX_PAGES, Math.max(1, Math.ceil(reportedTotal / PAGE_SIZE)));
    const remainingPages = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, index) => fetchProfilePage(index + 2)),
    );

    const rawClips = [firstPage, ...remainingPages].flatMap((page) =>
      Array.isArray(page.clips) ? page.clips : [],
    );
    const seenSongs = new Set();
    const songs = [];

    for (const clip of rawClips) {
      if (!clip?.id || seenSongs.has(clip.id) || clip.is_public === false || clip.is_hidden || clip.is_trashed) continue;
      seenSongs.add(clip.id);
      songs.push(mapSong(clip));
    }

    const seenPlaylists = new Set();
    const playlists = [];

    for (const playlist of Array.isArray(firstPage.playlists) ? firstPage.playlists : []) {
      if (!playlist?.id || seenPlaylists.has(playlist.id) || playlist.is_public === false || playlist.is_hidden || playlist.is_trashed) continue;
      seenPlaylists.add(playlist.id);
      playlists.push(mapPlaylist(playlist));
    }

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.setHeader("CDN-Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    sendJson(res, 200, {
      display_name: firstPage.display_name || "AJ Miller",
      handle: firstPage.handle || PROFILE,
      avatar: firstPage.avatar_image_url || "",
      total_songs: songs.length,
      total_playlists: playlists.length,
      fetched_at: new Date().toISOString(),
      songs,
      playlists,
    });
  } catch {
    res.setHeader("Cache-Control", "no-store");
    sendJson(res, 502, { error: "The Suno catalog is temporarily unavailable" });
  }
}
