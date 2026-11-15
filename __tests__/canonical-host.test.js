import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CONTACT_EMAIL, SITE_URL } from '../site.config.js'

const root = join(import.meta.dirname, '..')
const SKIP = new Set(['node_modules', '.git', 'dist', 'docs', '__tests__'])
const TEXT = /\.(html|js|json|txt|xml|css|md)$/

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (TEXT.test(name) && name !== 'pnpm-lock.yaml') out.push(p)
  }
  return out
}

const files = walk(root)
const read = (f) => readFileSync(join(root, f), 'utf8')

describe('canonical host', () => {
  it('never references the dead stellarvoyages.space domain', () => {
    const offenders = files
      .filter((f) => /stellarvoyages\.space/i.test(readFileSync(f, 'utf8')))
      .map((f) => relative(root, f))
    expect(offenders).toEqual([])
  })

  it('defines the live host once and uses it in robots.txt and sitemap.xml', () => {
    expect(SITE_URL).toBe('https://space-travel-website-theta.vercel.app')
    expect(read('public/robots.txt')).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
    const locs = [...read('public/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
    expect(locs.length).toBeGreaterThan(0)
    for (const loc of locs) expect(loc.startsWith(SITE_URL)).toBe(true)
  })

  it('does not hardcode the live origin in HTML (uses %SITE_URL%)', () => {
    const hard = readdirSync(root)
      .filter((f) => f.endsWith('.html'))
      .filter((f) => read(f).includes('space-travel-website-theta.vercel.app'))
    expect(hard).toEqual([])
  })

  const subToHub = {
    'destination-mars.html': 'destination.html',
    'destination-europa.html': 'destination.html',
    'destination-titan.html': 'destination.html',
    'crew-pilot.html': 'crew.html',
    'crew-engineer.html': 'crew.html',
    'crew-specialist.html': 'crew.html',
    'technology-vehicle.html': 'technology.html',
    'technology-spaceport.html': 'technology.html',
    'technology-capsule.html': 'technology.html',
  }
  for (const [sub, hub] of Object.entries(subToHub)) {
    it(`${sub} canonicalizes to ${hub}`, () => {
      expect(read(sub)).toContain(`<link rel="canonical" href="%SITE_URL%/${hub}">`)
    })
  }

  it('mailto links use the real contact address', () => {
    const mailtos = files.flatMap((f) =>
      [...readFileSync(f, 'utf8').matchAll(/mailto:([^"'\s>]+)/g)].map((m) => m[1]),
    )
    expect(mailtos.length).toBeGreaterThan(0)
    for (const m of mailtos) expect(m).toBe(CONTACT_EMAIL)
  })
})
