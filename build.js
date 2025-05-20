import nunjucks from 'nunjucks'
import { createDirectoryIfNotExists } from './scripts/utils.js'
import { buildAssets } from './scripts/generateHtml.js'
createDirectoryIfNotExists('./dist')
nunjucks.configure('views', { autoescape: true })
buildAssets()
