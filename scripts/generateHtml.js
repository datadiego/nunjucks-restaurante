import fs from 'fs'
import nunjucks from 'nunjucks'
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
