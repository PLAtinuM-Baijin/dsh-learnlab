// 把 esbuild 产出的 CJS 包成 DSH 模块加载器格式。
// 正常的构建是 `pnpm build`（走 build/build.mjs 的 JS API）；
// 若所在环境的沙箱不允许 esbuild spawn 子进程（会报 EPERM），退化成两步：
//   1) esbuild.exe src/client.jsx --bundle --format=cjs --platform=browser \
//        --target=chrome120 --external:react --jsx=transform \
//        --legal-comments=inline --outfile=build/app.cjs
//   2) node build/wrap.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

const bundle = fs.readFileSync(path.join(here, 'app.cjs'), 'utf8')

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
