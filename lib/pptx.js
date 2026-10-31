import { openZip } from './zip.js'

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decodeXml(value) {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X'
        ? Number.parseInt(body.slice(2), 16)
        : Number.parseInt(body.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole
    }
    return ENTITIES[body] ?? whole
  })
}

function runsOf(paragraphXml) {
  const runs = []
  const re = /<a:t\b[^>]*?(?:\/>|>([\s\S]*?)<\/a:t>)/g
  let match
  while ((match = re.exec(paragraphXml)) !== null) {
    if (match[1]) runs.push(decodeXml(match[1]))
  }
  return runs.join('')
}

/** 按文档顺序取一个 XML 片段里所有段落的文字（含表格里的段落）。 */
function paragraphsOf(xml) {
  const out = []
  const re = /<a:p\b[^>]*?(\/?)>([\s\S]*?)<\/a:p>|<a:p\b[^>]*\/>/g
  let match
  while ((match = re.exec(xml)) !== null) {
    const body = match[2] ?? ''
    const levelMatch = /<a:pPr\b[^>]*\blvl="(\d+)"/.exec(body)
    const level = levelMatch ? Number(levelMatch[1]) : 0
    const text = runsOf(body).replace(/\s+/g, ' ').trim()
    if (text) out.push({ level, text })
  }
  return out
}

function shapeBlocks(xml) {
  const blocks = []
  const re = /<p:sp\b[^>]*>[\s\S]*?<\/p:sp>/g
  let match
  while ((match = re.exec(xml)) !== null) {
    const body = match[0]
    const ph = /<p:ph\b[^>]*>/.exec(body)
    const typeMatch = ph ? /\btype="([a-zA-Z]+)"/.exec(ph[0]) : null
    blocks.push({ xml: body, phType: typeMatch ? typeMatch[1] : null, full: match.index })
  }
  return blocks
}

function stripShapes(xml, blocks) {
  let result = ''
  let cursor = 0
  for (const block of blocks) {
    result += xml.slice(cursor, block.full)
    cursor = block.full + block.xml.length
  }
  return result + xml.slice(cursor)
}

function toLines(paragraphs) {
  return paragraphs.map((p) => `${'  '.repeat(Math.min(p.level, 6))}${p.text}`)
}

function joinLines(lines) {
  return lines.join('\n').trim()
}

function slideNumber(name) {
  const match = /slide(\d+)\.xml$/.exec(name)
  return match ? Number(match[1]) : 0
}

function notesTargetFor(relsXml) {
  if (!relsXml) return undefined
  const re = /<Relationship\b[^>]*>/g
  let match
  while ((match = re.exec(relsXml)) !== null) {
    const tag = match[0]
    if (!/\/notesSlide\b/.test(tag)) continue
    const target = /\bTarget="([^"]+)"/.exec(tag)
    if (target) {
      const cleaned = target[1].replace(/^\.\.\//, '').replace(/^\//, '')
      return cleaned.startsWith('ppt/') ? cleaned : `ppt/${cleaned}`
    }
  }
  return undefined
}

function notesText(xml) {
  const blocks = shapeBlocks(xml)
  const body = blocks.filter((b) => b.phType === 'body')
  const paragraphs = body.length
    ? body.flatMap((b) => paragraphsOf(b.xml))
    : paragraphsOf(xml).filter((p) => !/^\d+$/.test(p.text) && p.text.length > 1)
  return joinLines(toLines(paragraphs))
}

/**
 * 从 .pptx 字节里取出逐页文字。
 * 返回的 slides 按页码排序，第 1 页是第 1 张幻灯片。
 */
export function extractPptx(buf) {
  const zip = openZip(buf)
  const slideNames = zip
    .names()
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => slideNumber(a) - slideNumber(b))

  if (slideNames.length === 0) throw new Error('这份文件里没有找到幻灯片内容')

  const slides = slideNames.map((name, index) => {
    const xml = zip.read(name).toString('utf8')
    const blocks = shapeBlocks(xml)
    const titleBlock = blocks.find((b) => b.phType === 'title' || b.phType === 'ctrTitle')
    const title = titleBlock ? joinLines(toLines(paragraphsOf(titleBlock.xml))) : ''
    const rest = stripShapes(xml, titleBlock ? [titleBlock] : [])
    const bodyParagraphs = paragraphsOf(rest)
    const lines = toLines(bodyParagraphs)
    const n = index + 1
    const relsName = `ppt/slides/_rels/slide${slideNumber(name)}.xml.rels`
    const relsXml = zip.has(relsName) ? zip.read(relsName).toString('utf8') : undefined
    const notesName = notesTargetFor(relsXml)
    const notes = notesName && zip.has(notesName) ? notesText(zip.read(notesName).toString('utf8')) : ''
    return {
      page: n,
      title: title || lines[0] || `第 ${n} 页`,
      lines,
      notes,
      text: [title, ...lines].filter(Boolean).join('\n').trim(),
    }
  })

  return { slides, pageCount: slides.length }
}
