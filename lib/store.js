import fsp from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFile } from 'node:child_process'

const SKIP_DIRS = new Set(['node_modules', '.git', '.dsh', 'dist', 'build', '.cache', '.plugin', '课件库'])
const IMPORTABLE = new Set(['.pptx', '.ppt', '.pdf', '.docx'])
const SOURCE_DIR = '课件源文件'
const META_FILES = ['deck.json', 'pages.json', 'chat.jsonl', 'pages']

export function safeName(input) {
  const cleaned = String(input)
    .replace(/[\u0000-\u001f]/g, '')
    .replace(/[\\/:*?"<>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned.slice(0, 48) || '未命名课件'
}

function newId(title) {
  const base = safeName(title).replace(/\s/g, '-')
  return `${base}-${crypto.randomBytes(3).toString('hex')}`
}

function nowIso() {
  return new Date().toISOString()
}

function hideOnWindows(target) {
  if (process.platform !== 'win32') return
  execFile('attrib', ['+h', target], () => {})
}

export class DeckStore {
  constructor(getWorkspace) {
    this.getWorkspace = getWorkspace
  }

  get workspace() {
    return this.getWorkspace()
  }

  get rootDir() {
    return path.join(this.workspace, 'LearnLab')
  }

  /** 课件库放在 LearnLab 容器里，和课件源文件、插件源码并列。 */
  get baseDir() {
    return path.join(this.rootDir, '课件库')
  }

  deckDir(id) {
    const name = String(id ?? '')
    if (!name || name === '.' || name === '..' || /[\\/]/.test(name) || name.includes('\0')) {
      throw new Error('课件标识不合法')
    }
    return path.join(this.baseDir, name)
  }

  /** 课件对外的可见文件只有 notes.md / summary.md / snapshots，其余都在这里。 */
  metaDir(id) {
    return path.join(this.deckDir(id), '.meta')
  }

  slidePath(id, page) {
    return path.join(this.metaDir(id), 'pages', `page-${String(page).padStart(4, '0')}.png`)
  }

  async ensureBase() {
    await fsp.mkdir(this.baseDir, { recursive: true })
  }

  /** 删除一份课件（笔记、总结、截图、页面图一起删）；源文件不动。 */
  async removeDeck(id) {
    const dir = this.deckDir(id)
    try {
      await fsp.access(path.join(this.metaDir(id), 'deck.json'))
    } catch {
      throw new Error('课件不存在')
    }
    await fsp.rm(dir, { recursive: true, force: true })
    return dir
  }

  /** 旧布局（deck.json 直接放在课件目录）自动搬进 .meta。 */
  async migrateIfNeeded(id) {
    const dir = this.deckDir(id)
    const meta = path.join(dir, '.meta')
    try {
      await fsp.access(path.join(meta, 'deck.json'))
      return
    } catch {
      /* 继续检查旧布局 */
    }
    try {
      await fsp.access(path.join(dir, 'deck.json'))
    } catch {
      return
    }
    await fsp.mkdir(meta, { recursive: true })
    for (const name of META_FILES) {
      const from = path.join(dir, name)
      const to = path.join(meta, name)
      try {
        await fsp.rename(from, to)
      } catch {
        /* 已经搬过或不存在 */
      }
    }
    hideOnWindows(meta)
  }

  async listDecks() {
    await this.ensureBase()
    const entries = await fsp.readdir(this.baseDir, { withFileTypes: true })
    const decks = []
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      try {
        await this.migrateIfNeeded(entry.name)
        decks.push(await this.readDeck(entry.name))
      } catch {
        /* 缺 deck.json 的目录跳过 */
      }
    }
    decks.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    return decks
  }

  async readDeck(id) {
    await this.migrateIfNeeded(id)
    const text = await fsp.readFile(path.join(this.metaDir(id), 'deck.json'), 'utf8')
    return JSON.parse(text)
  }

  async writeDeck(id, deck) {
    deck.updatedAt = nowIso()
    await fsp.mkdir(this.metaDir(id), { recursive: true })
    await fsp.writeFile(path.join(this.metaDir(id), 'deck.json'), `${JSON.stringify(deck, null, 2)}\n`, 'utf8')
    return deck
  }

  async patchDeck(id, patch) {
    const deck = await this.readDeck(id)
    Object.assign(deck, patch)
    return this.writeDeck(id, deck)
  }

  async readPages(id) {
    try {
      return JSON.parse(await fsp.readFile(path.join(this.metaDir(id), 'pages.json'), 'utf8'))
    } catch {
      return { pageCount: 0, pages: [] }
    }
  }

  async writePages(id, pages) {
    await fsp.mkdir(this.metaDir(id), { recursive: true })
    await fsp.writeFile(path.join(this.metaDir(id), 'pages.json'), `${JSON.stringify(pages, null, 2)}\n`, 'utf8')
    return pages
  }

  async createDeck({ sourcePath, kind }) {
    await this.ensureBase()
    const title = path.basename(sourcePath).replace(/\.[^.]+$/, '')
    const id = newId(title)
    const dir = this.deckDir(id)
    const meta = this.metaDir(id)
    await fsp.mkdir(meta, { recursive: true })
    await fsp.mkdir(path.join(dir, 'snapshots'), { recursive: true })
    hideOnWindows(meta)
    const deck = {
      id,
      title,
      kind,
      source: sourcePath,
      sourceName: path.basename(sourcePath),
      sourceSize: (await fsp.stat(sourcePath)).size,
      pageCount: 0,
      progress: 1,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      textSource: kind === 'pdf' ? 'none' : 'xml',
      visionDone: [],
      model: null,
      outline: [],
    }
    await this.writeDeck(id, deck)
    await fsp.writeFile(path.join(meta, 'chat.jsonl'), '', 'utf8')
    await fsp.writeFile(path.join(dir, 'notes.md'), `# ${title}\n\n`, 'utf8')
    return deck
  }

  async readNotes(id) {
    try {
      return await fsp.readFile(path.join(this.deckDir(id), 'notes.md'), 'utf8')
    } catch {
      return ''
    }
  }

  async writeNotes(id, text) {
    await fsp.writeFile(path.join(this.deckDir(id), 'notes.md'), text, 'utf8')
  }

  async appendNote(id, page, pageTitle, text) {
    const current = await this.readNotes(id)
    const sections = parseNotes(current)
    const key = String(page)
    const existing = sections.get(key)
    const bullet = String(text)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.startsWith('- ') || line.startsWith('#') ? line : `- ${line}`))
      .join('\n')
    if (existing) {
      existing.body = `${existing.body.trimEnd()}\n${bullet}\n`.trimStart()
      existing.title = existing.title || pageTitle
    } else {
      sections.set(key, { page, title: pageTitle || '', body: `${bullet}\n` })
    }
    const ordered = [...sections.values()].sort((a, b) => a.page - b.page)
    const head = (current.match(/^#\s.*$/m) || [])[0] || '# 学习笔记'
    const body = ordered
      .map((s) => `## 第 ${s.page} 页${s.title ? ` · ${s.title}` : ''}\n\n${s.body.trimEnd()}\n`)
      .join('\n')
    await this.writeNotes(id, `${head}\n\n${body}`.replace(/\n{3,}/g, '\n\n'))
    return this.readNotes(id)
  }

  async readSummary(id) {
    try {
      return await fsp.readFile(path.join(this.deckDir(id), 'summary.md'), 'utf8')
    } catch {
      return ''
    }
  }

  async writeSummary(id, text) {
    await fsp.writeFile(path.join(this.deckDir(id), 'summary.md'), text, 'utf8')
  }

  async saveSnapshot(id, page, buffer) {
    const dir = path.join(this.deckDir(id), 'snapshots')
    await fsp.mkdir(dir, { recursive: true })
    const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
    const name = `page-${String(page).padStart(3, '0')}-${stamp}.png`
    await fsp.writeFile(path.join(dir, name), buffer)
    return path.join(dir, name)
  }

  async appendChat(id, entry) {
    await fsp.mkdir(this.metaDir(id), { recursive: true })
    await fsp.appendFile(path.join(this.metaDir(id), 'chat.jsonl'), `${JSON.stringify(entry)}\n`, 'utf8')
  }

  /** 重新生成或改问题时，把这一页最后一条记录换掉，避免历史里同时留下新旧两份。 */
  async dropLastChat(id, page) {
    try {
      const file = path.join(this.metaDir(id), 'chat.jsonl')
      const lines = (await fsp.readFile(file, 'utf8')).split('\n').filter(Boolean)
      let target = -1
      for (let i = lines.length - 1; i >= 0; i -= 1) {
        try {
          if (Number(JSON.parse(lines[i]).page) === Number(page)) {
            target = i
            break
          }
        } catch {
          /* 跳过坏行 */
        }
      }
      if (target < 0) return
      lines.splice(target, 1)
      await fsp.writeFile(file, lines.map((line) => `${line}\n`).join(''), 'utf8')
    } catch {
      /* 没有历史文件就算了 */
    }
  }

  async readChat(id, limit = 400) {
    try {
      const text = await fsp.readFile(path.join(this.metaDir(id), 'chat.jsonl'), 'utf8')
      return text
        .split('\n')
        .filter(Boolean)
        .slice(-limit)
        .map((line) => {
          try {
            return JSON.parse(line)
          } catch {
            return undefined
          }
        })
        .filter(Boolean)
    } catch {
      return []
    }
  }

  /** 课件文件放哪：可用 .config.json 的 sourceDir 改，默认 LearnLab/课件源文件。 */
  async sourceDir() {
    let custom = ''
    try {
      const config = JSON.parse(await fsp.readFile(path.join(this.rootDir, '.config.json'), 'utf8'))
      if (typeof config?.sourceDir === 'string') custom = config.sourceDir.trim()
    } catch {
      custom = ''
    }
    const dir = custom ? path.resolve(custom) : path.join(this.rootDir, SOURCE_DIR)
    await fsp.mkdir(dir, { recursive: true }).catch(() => {})
    return dir
  }

  /** 可导入的课件（最多 200 个，跳过依赖与构建目录）。 */
  async listImportable() {
    const root = await this.sourceDir()
    const found = []
    const walk = async (dir, depth) => {
      if (depth > 3 || found.length >= 200) return
      let entries
      try {
        entries = await fsp.readdir(dir, { withFileTypes: true })
      } catch {
        return
      }
      for (const entry of entries) {
        if (found.length >= 200) return
        if (entry.name.startsWith('.')) continue
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          if (SKIP_DIRS.has(entry.name)) continue
          await walk(full, depth + 1)
        } else if (entry.isFile() && IMPORTABLE.has(path.extname(entry.name).toLowerCase())) {
          found.push({ path: full, name: entry.name, relative: path.relative(root, full) })
        }
      }
    }
    await walk(root, 0)
    found.sort((a, b) => a.relative.localeCompare(b.relative))
    return found
  }
}

function parseNotes(markdown) {
  const sections = new Map()
  const re = /^##\s+第\s*(\d+)\s*页(?:\s*·\s*(.*))?$/gm
  const marks = []
  let match
  while ((match = re.exec(markdown)) !== null) {
    marks.push({ page: Number(match[1]), title: (match[2] || '').trim(), start: match.index, end: re.lastIndex })
  }
  for (let i = 0; i < marks.length; i += 1) {
    const mark = marks[i]
    const stop = i + 1 < marks.length ? marks[i + 1].start : markdown.length
    sections.set(String(mark.page), {
      page: mark.page,
      title: mark.title,
      body: markdown.slice(mark.end, stop).trim(),
    })
  }
  return sections
}
