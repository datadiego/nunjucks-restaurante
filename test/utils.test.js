import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { createDirectoryIfNotExists, copyDirectory } from '../scripts/utils.js'

const testDir = path.join(process.cwd(), 'test', 'tmpdir')
const srcDir = path.join(process.cwd(), 'test', 'srcdir')
const destDir = path.join(process.cwd(), 'test', 'destdir')
const testFile = path.join(srcDir, 'file.txt')

beforeEach(() => {
  // Clean up before each test
  if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true })
  if (fs.existsSync(srcDir)) fs.rmSync(srcDir, { recursive: true, force: true })
  if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true, force: true })
})

afterEach(() => {
  // Clean up after each test
  if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true })
  if (fs.existsSync(srcDir)) fs.rmSync(srcDir, { recursive: true, force: true })
  if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true, force: true })
})

describe('createDirectoryIfNotExists', () => {
  it('crea un directorio si no existe', () => {
    expect(fs.existsSync(testDir)).toBe(false)
    createDirectoryIfNotExists(testDir)
    expect(fs.existsSync(testDir)).toBe(true)
  })

  it('no lanza error si el directorio ya existe', () => {
    fs.mkdirSync(testDir, { recursive: true })
    expect(() => createDirectoryIfNotExists(testDir)).not.toThrow()
  })
})

describe('copyDirectory', () => {
  it('copia archivos de un directorio a otro', () => {
    fs.mkdirSync(srcDir, { recursive: true })
    fs.writeFileSync(testFile, 'contenido de prueba')
    copyDirectory(srcDir, destDir)
    const copiedFile = path.join(destDir, 'file.txt')
    expect(fs.existsSync(copiedFile)).toBe(true)
    expect(fs.readFileSync(copiedFile, 'utf-8')).toBe('contenido de prueba')
  })

  it('crea el directorio destino si no existe', () => {
    fs.mkdirSync(srcDir, { recursive: true })
    fs.writeFileSync(testFile, 'contenido')
    expect(fs.existsSync(destDir)).toBe(false)
    copyDirectory(srcDir, destDir)
    expect(fs.existsSync(destDir)).toBe(true)
  })
})
