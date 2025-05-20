import { menu } from './menu.js'
import nunjucks from 'nunjucks'
import fs from 'fs'
import { createHTMLFile } from './scripts/generateHtml.js'

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
};

if (!fs.existsSync('./dist/imgs')) {
  fs.mkdirSync('./dist/imgs')
}
const imgsDir = "./imgs"
const outputImgsDir = './dist/imgs'
fs.readdirSync(imgsDir).forEach(file => {
  const srcPath = `${imgsDir}/${file}`
  const destPath = `${outputImgsDir}/${file}`
  fs.copyFileSync(srcPath, destPath)
})

const menuTemplate = './views/menu.njk'
const aboutTemplate = './views/about.njk'
nunjucks.configure('views', { autoescape: true })

createHTMLFile(menuTemplate, { menu }, './dist/index.html')
createHTMLFile(menuTemplate, { menu }, './dist/menu.html')
createHTMLFile(aboutTemplate, {}, './dist/about.html')

const cssFile = 'style.css'
const outputCssFile = './dist/style.css'
fs.copyFileSync(cssFile, outputCssFile)
