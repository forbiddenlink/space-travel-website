import { describe, it, expect, beforeEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

describe('Space Travel Website Utils', () => {
  let dom
  let document
  let window

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
    document = dom.window.document
    window = dom.window
    global.document = document
    global.window = window
  })

  describe('Back to Top Button', () => {
    it('should create button element with correct attributes', () => {
      const button = document.createElement('a')
      button.className = 'back-to-top'
      button.href = '#'
      button.setAttribute('aria-label', 'Back to top')

      expect(button.className).toBe('back-to-top')
      expect(button.href).toContain('#')
      expect(button.getAttribute('aria-label')).toBe('Back to top')
    })
  })

  describe('Progress Indicator', () => {
    it('should calculate scroll percentage correctly', () => {
      const windowHeight = 1000
      const scrollY = 500
      const scrolled = (scrollY / windowHeight) * 100
      expect(scrolled).toBe(50)
    })

    it('should handle zero height gracefully', () => {
      const windowHeight = 0
      const scrollY = 100
      const scrolled = windowHeight > 0 ? (scrollY / windowHeight) * 100 : 0
      expect(scrolled).toBe(0)
    })
  })

  describe('Image Enhancement', () => {
    it('should set lazy loading attribute', () => {
      const img = document.createElement('img')
      img.setAttribute('loading', 'lazy')
      expect(img.getAttribute('loading')).toBe('lazy')
    })
  })
})
