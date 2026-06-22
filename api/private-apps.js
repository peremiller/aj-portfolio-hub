// Vercel Node serverless function (ESM — package.json has "type":"module").
// Returns the private app list ONLY to a request carrying a valid hub_priv
// session cookie (issued by api/private-login.js). If PRIVATE_PASSWORD is not
// configured the endpoint behaves as if it doesn't exist (404). This keeps the
// private app(s) out of the static bundle entirely — they're served at runtime.

import crypto from 'node:crypto'

const COOKIE_NAME = 'hub_priv'
const TOKEN_MESSAGE = 'hub-private-v1'

const PRIVATE_APPS = [
  {
    name: 'Retirement Guardian',
    desc: 'Guardrails-based retirement spending tool that signals when to adjust withdrawals to stay on track.',
    url: 'https://peremiller.github.io/retirement-guardian/',
  },
]

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

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (!process.env.PRIVATE_PASSWORD) {
    res.status(404).json({ error: 'Not found' })
    return
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const cookies = parseCookies(req.headers && req.headers.cookie)
  const provided = cookies[COOKIE_NAME] || ''

  if (!safeTokenEqual(provided, sessionToken())) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  res.status(200).json({ apps: PRIVATE_APPS })
}
