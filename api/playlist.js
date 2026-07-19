const PLAYLIST_API = "https://studio-api.prod.suno.com/api/playlist";
const PAGE_SIZE = 20;
const MAX_PAGES = 25;

const SUNO_HEADERS = {
  Accept: "application/json",
  "User-Agent": "Mozilla/5.0 (compatible; AJPortfolioMusicSync/1.0)",
};

async function fetchPlaylistPage(id, page) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${PLAYLIST_API}/${id}?page=${page}`, {
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

function mapTrack(clip) {
  const metadata = clip.metadata || {};
  return {
    id: clip.id,
    title: clip.title || "Untitled",
    url: `https://suno.com/song/${clip.id}`,
    image: clip.image_large_url || clip.image_url || "",
    audio: clip.audio_url || "",
    plays: clip.play_count ?? 0,
    duration: metadata.duration ?? clip.duration ?? null,
    created: clip.created_at || null,
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

  const id = String(req.query?.id || "");
  if (!/^[a-zA-Z0-9-]{1,64}$/.test(id)) {
    sendJson(res, 400, { error: "Missing or invalid playlist id" });
    return;
  }

  try {
    const firstPage = await fetchPlaylistPage(id, 1);
    const total = Number(firstPage.num_total_results) || Number(firstPage.song_count) || 0;
    const pageCount = Math.min(MAX_PAGES, Math.max(1, Math.ceil(total / PAGE_SIZE)));
    const remainingPages = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, index) => fetchPlaylistPage(id, index + 2)),
    );
    const rawTracks = [firstPage, ...remainingPages].flatMap((page) =>
      Array.isArray(page.playlist_clips) ? page.playlist_clips : [],
    );
    const seen = new Set();
    const tracks = [];

    for (const entry of rawTracks) {
      const clip = entry?.clip || entry;
      if (!clip?.id || seen.has(clip.id) || clip.is_public === false || clip.is_hidden || clip.is_trashed) continue;
      seen.add(clip.id);
      tracks.push(mapTrack(clip));
    }

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.setHeader("CDN-Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    sendJson(res, 200, {
      id,
      title: firstPage.name || "Untitled playlist",
      url: `https://suno.com/playlist/${id}`,
      count: tracks.length,
      tracks,
    });
  } catch {
    res.setHeader("Cache-Control", "no-store");
    sendJson(res, 502, { error: "The playlist is temporarily unavailable" });
  }
}
