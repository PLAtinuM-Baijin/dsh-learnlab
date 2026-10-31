// 一条命令构建：pnpm build
// 需要先 pnpm install（esbuild 与 lucide-react）。
//
// 注意：若运行环境的沙箱不允许 esbuild spawn 子进程（Windows 下报 EPERM），
// 请改用 build/README.md 里的两步 CLI 方式。
import { build } from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

const result = await build({
  entryPoints: [path.join(root, 'src/client.jsx')],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome120'],
  external: ['react'],
  jsx: 'transform',
  // 保留第三方许可声明（lucide-react 是 ISC，再分发需要保留）
  legalComments: 'inline',
  logLevel: 'warning',
})

const bundle = result.outputFiles[0].text

const wrapper = `// 由 src/ 构建生成，不要直接编辑这个文件。
window.__ModuleLoader__.load({
  id: ${JSON.stringify(pkg.name)},
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
${bundle}
    if (module.exports && module.exports.default) return module.exports.default;
    return module.exports;
  },
});
`

fs.writeFileSync(path.join(root, 'client.js'), wrapper, 'utf8')
console.log(`client.js 已生成（${pkg.name}）：${(wrapper.length / 1024).toFixed(1)} KB`)
