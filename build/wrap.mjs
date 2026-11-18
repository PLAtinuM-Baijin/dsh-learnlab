// 把 esbuild 产出的 CJS 包成 DSH 模块加载器格式。
// 正常的构建是 `pnpm build`（走 build/build.mjs 的 JS API）；
// 若所在环境的沙箱不允许 esbuild spawn 子进程（会报 EPERM），退化成两步：
//   1) esbuild.exe src/client.jsx --bundle --format=cjs --platform=browser \
//        --target=chrome120 --external=react --jsx=transform \
//        --legal-comments=inline --outfile=build/app.cjs
//   2) node build/wrap.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

const appCjs = path.join(here, 'app.cjs')

// 守卫：如果 src/ 里有文件比 app.cjs 新，说明上一步 esbuild 没跑成功，
// 此时若照常打包，会产出一个「时间戳很新、代码却是旧的」的产物。
const newestMtime = (dir) => {
  let newest = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) newest = Math.max(newest, newestMtime(full))
    else newest = Math.max(newest, fs.statSync(full).mtimeMs)
  }
  return newest
}
const srcTime = newestMtime(path.join(root, 'src'))
if (srcTime > fs.statSync(appCjs).mtimeMs + 1000) {
  console.error('✗ build/app.cjs 比 src/ 里的文件旧，esbuild 那一步没有成功。')
  console.error('  请先重新执行 esbuild（见 build/README.md），再运行本脚本。')
  process.exit(1)
}

const bundle = fs.readFileSync(appCjs, 'utf8')
// 统一用 UTC 并显式标上 Z，避免和本地时间混看（这里比北京时间慢 8 小时）
const stamp = `${new Date().toISOString().slice(0, 16).replace('T', ' ')}Z`

const wrapper = [
  '// 由 src/ 构建生成，不要直接编辑这个文件。',
  `var __LL_VERSION__ = ${JSON.stringify(pkg.version)};`,
  `var __LL_BUILD__ = ${JSON.stringify(stamp)};`,
  'window.__ModuleLoader__.load({',
  `  id: ${JSON.stringify(pkg.name)},`,
  '  factory(require) {',
  '    var module = { exports: {} };',
  '    var exports = module.exports;',
  bundle,
  '    if (module.exports && module.exports.default) return module.exports.default;',
  '    return module.exports;',
  '  },',
  '});',
  '',
].join('\n')

fs.writeFileSync(path.join(root, 'client.js'), wrapper, 'utf8')
console.log(`client.js 已生成（${pkg.name}@${pkg.version} · build ${stamp}）：${(wrapper.length / 1024).toFixed(1)} KB`)
