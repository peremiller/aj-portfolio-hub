// Vercel Node serverless function (ESM — package.json has "type":"module").
// GATED analytics dashboard feed. Visitor locations are private, so this
// endpoint is protected by the SAME hub_priv session cookie used by
// api/private-apps.js (HMAC-SHA256 over SESSION_SECRET||PRIVATE_PASSWORD with
// message 'hub-private-v1', constant-time compared). Reads the single fixed blob
// analytics/stats.json written by api/track.js and returns a computed summary.
// If no Blob store is connected, returns { configured:false } so the UI can
// explain the setup step instead of showing a locked/empty dashboard.

import { head } from '@vercel/blob'
import crypto from 'node:crypto'

const BLOB_PATH = 'analytics/stats.json'
const COOKIE_NAME = 'hub_priv'
const TOKEN_MESSAGE = 'hub-private-v1'

function sessionToken() {
  const key = (process.env.SESSION_SECRET || '') + (process.env.PRIVATE_PASSWORD || '')
  return crypto.createHmac('sha256', key).update(TOKEN_MESSAGE).digest('hex')
}

// Constant-time compare of two hex token strings of expected equal length.
function safeTokenEqual(a, b) {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

function parseCookies(header) {
  const out = {}
  if (!header) return out
  for (const part of String(header).split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const k = part.slice(0, idx).trim()
    const v = part.slice(idx + 1).trim()
    if (k) out[k] = v
  }
  return out
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    // No Blob store connected → tell the UI it isn't set up yet.
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      res.status(200).json({ configured: false })
      return
    }

    // Private gate — reuse the exact hub_priv token check from private-apps.js.
    const cookies = parseCookies(req.headers && req.headers.cookie)
    const provided = cookies[COOKIE_NAME] || ''
    if (!process.env.PRIVATE_PASSWORD || !safeTokenEqual(provided, sessionToken())) {
      res.status(401).json({ error: 'auth' })
      return
    }

    // Load current stats (or treat as empty).
    let data = { total: 0, unique: 0, daily: {}, countries: {}, cities: {}, recent: [] }
    try {
      const meta = await head(BLOB_PATH)
      const r = await fetch(meta.url, { cache: 'no-store' })
      data = await r.json()
    } catch {
      /* missing blob → empty init */
    }

    const daily = data.daily || {}
    const countries = data.countries || {}
    const cities = data.cities || {}
    const recent = Array.isArray(data.recent) ? data.recent : []

    const todayUTC = new Date().toISOString().slice(0, 10)
    const today = daily[todayUTC] || 0

    // Sum of the last 7 calendar days (UTC), including today.
    let last7 = 0
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
      last7 += daily[d] || 0
    }

    const byCountry = Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12)

    const points = Object.values(cities)
      .map((c) => ({
        lat: c.lat,
        lng: c.lng,
        city: c.city,
        country: c.country,
        count: c.count || 0,
      }))
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
      .sort((a, b) => b.count - a.count)
      .slice(0, 400)

    res.status(200).json({
      configured: true,
      total: data.total || 0,
      unique: data.unique || 0,
      today,
      last7,
      byCountry,
      points,
      recent: recent.slice(0, 20),
      updated: new Date().toISOString(),
    })
  } catch {
    res.status(500).json({ error: 'failed' })
  }
}
