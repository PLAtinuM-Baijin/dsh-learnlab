# 前端构建

`client.js` 是**构建产物**，不要手改；源码在 `src/`。

## 目录

```
src/app.js            面板主体（React + 手写 CSS）
src/client.jsx        入口：导出插件对象
src/components/       独立组件（图标等）
build/build.mjs       pnpm build 用的脚本（esbuild JS API）
build/wrap.mjs        套上 __ModuleLoader__ 的壳
client.js             构建产物（模块加载器格式）
```

## 正常构建

```bash
pnpm install
pnpm build
```

## 沙箱里 esbuild 起不来时（Windows 报 `EPERM`）

esbuild 的 JS API 会 spawn 子进程，某些沙箱环境不允许，此时直接调二进制：

```powershell
$repo = "<本仓库绝对路径>"
$exe  = "$repo\build\node_modules\@esbuild\win32-x64\esbuild.exe"

$env:NODE_PATH = "$repo\build\node_modules"
Push-Location $repo
& $exe "src/client.jsx" --bundle --format=cjs --platform=browser `
  --target=chrome120 --external=react --jsx=transform `
  --legal-comments=inline --outfile="build/app.cjs"
Pop-Location
Remove-Item Env:\NODE_PATH

node "$repo\build\wrap.mjs"
```

## 约定

- 只有 `react` 外置：浏览器端由宿主模块表提供。**不要把 react 打进包里**，会和宿主冲突。
- JSX 用经典转换，每个 `.jsx` 都要 `import React from 'react'`。
- `--legal-comments=inline` 不要改成 `none`：包里含 lucide-react（ISC），再分发必须保留声明。

## 验证（没有浏览器时）

1. `node --check client.js`
2. 用 vm 沙箱加载 `client.js`，`factory(require)` 返回的对象应有 `inject` 与 `apply`
3. 调用 `apply`，应注册 `sidebar.panellist`(id=`learnlab`) 与 `main`(key=`learnlab`)
