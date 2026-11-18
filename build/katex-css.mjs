// 把 KaTeX 的样式和字体打包成一个可以直接塞进 <style> 的字符串。
// 产物写到 build/katex-css.js（不进 Git、也不进 npm 包：插件发布的是预构建的 client.js）。
//
// 只内联 woff2：KaTeX 的 CSS 给每个字体准备了 woff2/woff/ttf 三种源，
// 现代 Chromium 一律用 woff2，把另外两种也塞进来只会让包大三倍。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const dist = path.join(root, 'node_modules', 'katex', 'dist')

const cssPath = path.join(dist, 'katex.min.css')
if (!fs.existsSync(cssPath)) {
  console.error('✗ 找不到 katex，先运行 pnpm install')
  process.exit(1)
}

const source = fs.readFileSync(cssPath, 'utf8')

let inlined = 0
let dropped = 0

// 逐个处理 @font-face 块：只保留 woff2 源，并把它内联成 data URI
const css = source.replace(/@font-face\{[^}]*\}/g, (block) => {
  const woff2 = /url\((['"]?)fonts\/([^)'"]+\.woff2)\1\)/.exec(block)
  if (!woff2) {
    dropped += 1
    return block
  }
  const file = woff2[2]
  const filePath = path.join(dist, 'fonts', file)
  if (!fs.existsSync(filePath)) {
    dropped += 1
    return block
  }
  const base64 = fs.readFileSync(filePath).toString('base64')
  inlined += 1
  const rest = block.slice(0, block.indexOf('src:'))
  return `${rest}src:url(data:font/woff2;base64,${base64}) format('woff2')}`
})

const banner = '/* KaTeX 样式（仅内联 woff2），由 build/katex-css.mjs 生成 */\n'
const out = `${banner}export default ${JSON.stringify(css)}\n`
fs.writeFileSync(path.join(here, 'katex-css.js'), out, 'utf8')
console.log(`katex-css.js 已生成：内联 woff2 ${inlined} 个${dropped ? `，跳过 ${dropped} 块` : ''}，共 ${(out.length / 1024).toFixed(0)} KB`)
