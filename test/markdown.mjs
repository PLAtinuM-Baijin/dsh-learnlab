// Markdown / 公式渲染的回归测试。
// 这几轮线上 bug 全部出在这里（加粗里的公式、$$ 多行、\(...\) 不识别），
// 所以直接拿真实组件跑断言，而不是靠截图。
//
// 组件在 src/app.js 内部、没有导出，这里按函数边界切出来求值。
// 只要这几个函数的相对位置不变就能跑；改动它们时如果切不出来，测试会报错提醒。
import fs from 'node:fs'
import path from 'node:path'
import katex from 'katex'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const source = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8')
const lines = source.split('\n')

const start = lines.findIndex((line) => line.includes('function escapeHtml'))
const end = lines.findIndex((line, index) => index > start && line.includes('/* ------------------------------------------------------------ 幻灯片'))
if (start < 0 || end < 0) {
  console.error('✗ 无法从 src/app.js 切出 Markdown 区间（结构化改动后需要更新本测试）')
  process.exit(1)
}
const region = lines.slice(start, end).join('\n')

const h = (tag, props, ...kids) => ({
  tag,
  cls: props?.className,
  kids: kids.flat(),
  html: props?.dangerouslySetInnerHTML?.__html,
})
// region 里已经包含 escapeHtml，这里只需要把 katex 注进去
const factory = new Function('h', 'katex', `${region}\nreturn { Markdown, texToHtml };`)
const { Markdown } = factory(h, katex)

const failures = []
const check = (label, ok, detail) => {
  if (!ok) failures.push(label)
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${!ok && detail ? ` → ${detail}` : ''}`)
}

/** 走一遍渲染树，统计公式节点与"漏网的 $"。 */
function scan(text) {
  const tree = Markdown({ text })
  let math = 0
  let raw = []
  const walk = (node) => {
    if (typeof node === 'string') {
      if (node.includes('$')) raw.push(node)
      return
    }
    if (Array.isArray(node)) { node.forEach(walk); return }
    if (!node || !node.tag) return
    if (node.cls?.includes('m-math')) { math += 1; return }
    for (const kid of node.kids || []) walk(kid)
  }
  walk(tree)
  return { math, raw }
}

// 1. 加粗里的公式（线上真实事故：整段加粗导致整句公式不渲染）
{
  const { math, raw } = scan('结论：**素数 $M$ 保证 $(M+1)/2$ 个桶。**')
  check('加粗内部的 $...$ 会被解析', math === 2 && raw.length === 0, `math=${math} raw=${raw.length}`)
}

// 2. 行内 LaTeX 原生分隔符
{
  const { math, raw } = scan('以两位数 \\(n=10a+b\\) 为例，其中 \\(a^2\\) 与 \\(b^2\\) 都参与。')
  check('\\(...\\) 行内公式会被解析', math === 3 && raw.length === 0, `math=${math} raw=${raw.length}`)
}

// 3. 块级公式：$$ 独占一行
{
  const { math, raw } = scan('说明\n$$\nE=mc^2\n$$\n后文')
  check('$$ 独占一行的块级公式', math === 1 && raw.length === 0, `math=${math} raw=${raw.length}`)
}

// 4. 块级公式：开标记同一行有内容、闭合在后续行（线上事故）
{
  const { math, raw } = scan('$$ \\neg(B\\land C)\\iff \\neg B\\lor\\neg C\n\\iff B(\\neg p)\n=A(\\neg p). $$')
  check('$$ 开标记带内容的跨行公式', math === 1 && raw.length === 0, `math=${math} raw=${raw.length}`)
}

// 5. 块级公式：\[ … \]
{
  const { math, raw } = scan('前\n\\[ x^2 \\]\n后')
  check('\\[...\\] 块级公式', math === 1 && raw.length === 0, `math=${math} raw=${raw.length}`)
}

// 6. 未闭合的 $$ 不能吞掉后面的正文
{
  const { math, raw } = scan('前\n$$\n没有闭合\n后文一\n后文二')
  check('未闭合的 $$ 回退成正文', math === 0 && raw.length === 1, `math=${math} raw=${raw.length}`)
}

// 7. 普通文本里的 $ 不该被误当公式
{
  const { math } = scan('价格是 5$ 一件，总共 20$。')
  check('孤立的 $ 不产生公式', math === 0, `math=${math}`)
}

// 8. 不认识的命令保留反斜杠，便于识别
{
  const { texToHtml } = factory(h, katex)
  const html = texToHtml('\\foo')
  check('未知命令保留反斜杠', html.includes('\\foo') || html.includes('\\\\foo'), html)
}

// 9. 常见符号不退化
{
  const { texToHtml } = factory(h, katex)
  const html = texToHtml('A\\bigvee_{i} B \\qquad C \\iff D')
  check('符号与间距命令都有输出', html.includes('⋁') && (html.includes('⟺') || html.includes('⇔')) && html.includes('mspace'), html)
}

if (failures.length) {
  console.error(`\n${failures.length} 项失败`)
  process.exit(1)
}
console.log('\n全部通过')
