import fs from 'fs'

export function createDirectoryIfNotExists (directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true }) // <-- agrega { recursive: true }
  }
}

export function copyDirectory (src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
  fs.readdirSync(src).forEach(file => {
    const srcPath = `${src}/${file}`
    const destPath = `${dest}/${file}`
    fs.copyFileSync(srcPath, destPath)
  })
}
