// 冒烟测试：不需要浏览器，只验证「产物能加载、能注册槽位」。
// 用法：node test/smoke.mjs
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const source = fs.readFileSync(path.join(root, 'client.js'), 'utf8')

const failures = []
const check = (label, ok) => {
  if (!ok) failures.push(label)
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`)
}

// 最小 React 替身：只够组件定义通过，不渲染
const React = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  forwardRef: (render) => render,
  memo: (component) => component,
  useState: (value) => [value, () => {}],
  useEffect: () => {},
  useLayoutEffect: () => {},
  useMemo: (factory) => factory(),
  useCallback: (fn) => fn,
  useRef: (value) => ({ current: value }),
  useContext: () => ({}),
  useReducer: (reducer, initial) => [initial, () => {}],
  createContext: (value) => ({ value }),
  Fragment: 'fragment',
}

let loaded = null
const sandbox = {
  window: {
    __ModuleLoader__: { load: (definition) => { loaded = definition } },
    addEventListener() {},
    removeEventListener() {},
    innerWidth: 1440,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
  },
  console,
  fetch: async () => ({ ok: true, status: 200, text: async () => '{}', json: async () => ({}) }),
  TextDecoder,
  JSON,
  Math,
  Date,
  URL,
  URLSearchParams,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
  MutationObserver: class { observe() {} disconnect() {} },
  Image: class {},
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  cancelAnimationFrame: (id) => clearTimeout(id),
}
sandbox.globalThis = sandbox
sandbox.self = sandbox.window

vm.createContext(sandbox)
vm.runInContext(source, sandbox, { filename: 'client.js' })

check('client.js 调用 __ModuleLoader__.load', Boolean(loaded))
check(`模块 id 与 package.json 一致（${pkg.name}）`, loaded?.id === pkg.name)
check('factory 是函数', typeof loaded?.factory === 'function')

const plugin = loaded.factory((name) => {
  if (name === 'react') return React
  throw new Error(`产物不应 require ${name}`)
})

check('默认导出带 apply', typeof plugin?.apply === 'function')

const registered = []
if (typeof plugin?.apply === 'function') {
  plugin.apply({
    slots: {
      inject: (key, callback) => callback(),
      register: (declaration, component) => {
        if (typeof component !== 'function') throw new Error('槽位组件必须是函数')
        registered.push(declaration)
        return () => {}
      },
    },
    effect: (callback) => { callback(); return () => {} },
  }, {})
}

check('注册了 sidebar.panellist', registered.some((item) => item.name === 'sidebar.panellist' && item.id === 'learnlab'))
check('注册了 main', registered.some((item) => item.name === 'main' && item.key === 'learnlab'))

if (failures.length) {
  console.error(`\n${failures.length} 项失败`)
  process.exit(1)
}
console.log('\n全部通过')
