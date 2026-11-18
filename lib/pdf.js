// PDF 文字层提取：只取文字，不做渲染（渲染走 LibreOffice + pdfium）。
import path from 'node:path'

let pdfjsModule = null

async function loadPdfjs() {
  if (!pdfjsModule) {
    // legacy 构建能在 Node 里直接跑，不需要 canvas（我们只要文字）
    pdfjsModule = await import('pdfjs-dist/legacy/build/pdf.mjs')
  }
  return pdfjsModule
}

/** 把一页的文字项按「行（y 降序）→ 列（x 升序）」拼回正文。 */
function joinItems(items) {
  const lines = new Map()
  for (const item of items) {
    const text = item?.str
    if (!text) continue
    const transform = item.transform ?? []
    const x = Number(transform[4]) || 0
    const y = Number(transform[5]) || 0
    const key = Math.round(y / 3)
    if (!lines.has(key)) lines.set(key, [])
    lines.get(key).push({ x, text })
  }
  const rows = [...lines.entries()].sort((a, b) => b[0] - a[0])
  const out = []
  for (const [, parts] of rows) {
    parts.sort((a, b) => a.x - b.x)
    let line = ''
    for (const part of parts) {
      const piece = part.text
      // 中文不需要空格；两侧都是拉丁字母/数字时才补一个
      if (line && /[A-Za-z0-9]$/.test(line) && /^[A-Za-z0-9]/.test(piece)) line += ' '
      line += piece
    }
    const trimmed = line.replace(/\s+/g, ' ').trim()
    if (trimmed) out.push(trimmed)
  }
  return out.join('\n')
}

/**
 * 抽取每一页的文字。
 * 返回 { pages: string[], hasText: boolean }，页序与渲染出的页码一致。
 * 扫描件（没有文字层）会得到一串空字符串。
 */
export async function extractPdfText(buffer) {
  const pdfjs = await loadPdfjs()
  const data = new Uint8Array(buffer)
  const doc = await pdfjs.getDocument({
    data,
    useSystemFonts: true,
    isEvalSupported: false,
    disableFontFace: true,
  }).promise

  const pages = []
  try {
    for (let n = 1; n <= doc.numPages; n += 1) {
      const page = await doc.getPage(n)
      try {
        const content = await page.getTextContent()
        pages.push(joinItems(content.items))
      } finally {
        page.cleanup?.()
      }
    }
  } finally {
    await doc.destroy?.().catch?.(() => {})
  }

  // pdfjs 的警告会打到 stderr，这里不需要
  void path
  return { pages, hasText: pages.some((text) => text.trim().length > 0) }
}
