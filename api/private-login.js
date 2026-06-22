// Vercel Node serverless function (ESM — package.json has "type":"module").
// Server-enforced password gate for the private app(s). If PRIVATE_PASSWORD is
// not configured this endpoint behaves as if it doesn't exist (404) so public
// deployments expose nothing. On a correct password it issues an HttpOnly,
// Secure, SameSite=Strict session cookie that api/private-apps.js validates.

import crypto from 'node:crypto'

const COOKIE_NAME = 'hub_priv'
const TOKEN_MESSAGE = 'hub-private-v1'

// Derive the opaque session token bound to the configured secret + password.
function sessionToken() {
  const key = (process.env.SESSION_SECRET || '') + (process.env.PRIVATE_PASSWORD || '')
  return crypto.createHmac('sha256', key).update(TOKEN_MESSAGE).digest('hex')
}

// Constant-time string compare via SHA-256 digests of equal length.
function safeEqual(a, b) {
  const da = crypto.createHash('sha256').update(String(a)).digest()
  const db = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(da, db)
}

async function readBody(req) {
  // Vercel usually parses JSON into req.body; fall back to manual read.
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string' && req.body) {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  // No password configured → this feature does not exist on this deployment.
  if (!process.env.PRIVATE_PASSWORD) {
    res.status(404).json({ error: 'Not found' })
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = await readBody(req)
  const submitted = body && typeof body.password === 'string' ? body.password : ''

  if (!safeEqual(submitted, process.env.PRIVATE_PASSWORD)) {
    res.status(401).json({ error: 'Incorrect password' })
    return
  }

  const token = sessionToken()
  const cookie = [
    `${COOKIE_NAME}=${token}`,
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    'Path=/',
    `Max-Age=${60 * 60 * 24 * 30}`,
  ].join('; ')
  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ ok: true })
}
