import { describe, it, expect, afterAll } from 'vitest'
import fs from 'fs'
import { execSync } from 'child_process'

describe('build.js', () => {
  it('genera los archivos esperados', () => {
    execSync('node build.js')
    expect(fs.existsSync('./dist/index.html')).toBe(true)
    expect(fs.existsSync('./dist/menu.html')).toBe(true)
    expect(fs.existsSync('./dist/about.html')).toBe(true)
    expect(fs.existsSync('./dist/style.css')).toBe(true)
  })

  afterAll(() => {
    // Limpieza opcional
    fs.rmSync('./dist', { recursive: true, force: true })
  })
})
