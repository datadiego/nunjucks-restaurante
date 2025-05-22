import fs from 'fs'
import nunjucks from 'nunjucks'
import { createDirectoryIfNotExists, copyDirectory } from './utils.js'
import { menu } from '../menu.js'
import { create } from 'domain'
export function generateHTML (template, data) {
  const templateContent = fs.readFileSync(template, 'utf-8')
  const html = nunjucks.renderString(templateContent, data)
  return html
}

export function createHTMLFile (template, data, outputFile) {
  const html = generateHTML(template, data)
  fs.writeFileSync(outputFile, html, 'utf-8')
  console.log(`Archivo ${outputFile} generado con éxito.`)
}

export function buildAssets () {
  createDirectoryIfNotExists('./dist/imgs')
  copyDirectory('./imgs', './dist/imgs')
  createHTMLFile('views/menu.njk', { menu }, './dist/index.html')
  createHTMLFile('views/menu.njk', { menu }, './dist/menu.html')
  createHTMLFile('views/about.njk', {}, './dist/about.html')
  createHTMLFile('views/location.njk', {}, './dist/location.html')
  const cssFile = 'style.css'
  const outputCssFile = './dist/style.css'
  fs.copyFileSync(cssFile, outputCssFile)
}
