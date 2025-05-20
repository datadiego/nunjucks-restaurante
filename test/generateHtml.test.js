import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import { generateHTML, createHTMLFile } from 'scripts/generateHtml.js'

const testTemplatePath = path.join(process.cwd(), 'test', 'testTemplate.njk')
const testOutputPath = path.join(process.cwd(), 'test', 'testOutput.html')
const templateContent = '<h1>{{ title }}</h1><p>{{ message }}</p>'

beforeAll(() => {
  fs.writeFileSync(testTemplatePath, templateContent, 'utf-8')
})

afterAll(() => {
  if (fs.existsSync(testTemplatePath)) fs.unlinkSync(testTemplatePath)
  if (fs.existsSync(testOutputPath)) fs.unlinkSync(testOutputPath)
})

describe('generateHTML', () => {
  it('debe renderizar el HTML correctamente', () => {
    const html = generateHTML(testTemplatePath, { title: 'Hola', message: 'Mundo' })
    expect(html).toContain('<h1>Hola</h1>')
    expect(html).toContain('<p>Mundo</p>')
  })
})

describe('createHTMLFile', () => {
  it('debe crear un archivo HTML con el contenido renderizado', () => {
    createHTMLFile(testTemplatePath, { title: 'Prueba', message: 'Archivo' }, testOutputPath)
    const outputHtml = fs.readFileSync(testOutputPath, 'utf-8')
    expect(outputHtml).toContain('<h1>Prueba</h1>')
    expect(outputHtml).toContain('<p>Archivo</p>')
  })
})
