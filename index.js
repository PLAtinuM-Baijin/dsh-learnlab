import fsp from 'node:fs/promises'
import path from 'node:path'

import { DeckStore } from './lib/store.js'
import { extractPptx } from './lib/pptx.js'
import { renderPages, kitStatus, convertTo } from './lib/render.js'
import { translate, readConfig, writeConfig } from './lib/translate.js'

export const inject = ['webServer', 'llm', 'attachments', 'agentDefaultModel', 'workingDirectory', 'workspaceRegistry']

const PREFIX = '/api/learnlab'
const MAX_BODY = 12 * 1024 * 1024

/** LearnLab 落在用户的工作区里，而不是 DSH 自己的 profile 目录。 */
function resolveWorkspace(ctx) {
  const fallback = ctx.workingDirectory?.defaultDirectory || process.cwd()
  try {
    const list = ctx.workspaceRegistry?.list?.() ?? []
    if (!list.length) return fallback
    const dshRoot = process.env.DSH_PROFILE_DIR
      ? path.dirname(process.env.DSH_PROFILE_DIR)
      : null
    const insideDsh = (target) => {
      if (!dshRoot) return false
      const rel = path.relative(dshRoot, target)
      return Boolean(rel) && !rel.startsWith('..') && !path.isAbsolute(rel)
    }
    const preferred = list.find((item) => item?.path && !insideDsh(item.path))
    return preferred?.path ?? list[0]?.path ?? fallback
  } catch {
    return fallback
  }
}

const COACH_SYSTEM = [
  '你是一位坐在学生旁边的课程教练，正在陪他读一份课件。',
  '你的回答要帮助他真正理解，而不是把课件再念一遍。',
  '默认结构：先给结论，再讲为什么，必要时给一个具体例子。',
  '只依据课件内容和公认常识回答；课件里没有、你也不确定的，直说不确定，不要编造。',
  '引用课件位置时写成「第 N 页」。',
  '不要复述他的问题，不要客套，不要用「作为一个AI」这类说法。',
  '用中文回答，除非他要求别的语言。',
]

const DRAW_SYSTEM = [
  '',
  '需要说明结构、流程、层次、状态变化或对比关系时，你可以画一张示意图，帮助学生理解。',
  '画图方式：输出一个 ```svg 代码块，里面是一份完整的 SVG。',
  '要求：根元素写 xmlns="http://www.w3.org/2000/svg" 和 viewBox（建议 0 0 640 400）；',
  '背景透明，线条和文字用具体的深色（例如 #1f2937），不要依赖继承色；',
  '不要引用外部资源、不要写 script、不要用 foreignObject；文字用 <text>，字号不小于 13；',
  '图要克制：只画关系本身，不要把整段解释塞进图里。图后面继续用文字把话讲完。',
]

const SUMMARY_SYSTEM = [
  '你是一位很会做学习笔记的助教。你在为一份课件写「学完之后的总结」。',
  '总结要能替代学生重读一遍课件：结构清楚、重点突出、可直接复习。',
  '只使用给出的课件内容和学生问过的问题，不要引入课件之外的知识主张。',
  '用中文写，Markdown 格式，不要代码块包裹整篇内容。',
]

const TRANSCRIBE_SYSTEM = [
  '你是一个精确的文档转录器。你会收到一页课件的图片。',
  '请逐字转录图片上的文字，保持原有的层级、顺序和分条结构。',
  '公式用普通文本书写（例如 a × b = c）。',
  '不要解释、不要总结、不要添加任何图片上没有的内容。',
  '如果这一页几乎没有文字，只输出：[无文字]。',
]

export function apply(ctx) {
  const store = new DeckStore(() => resolveWorkspace(ctx))
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: PREFIX,
    handler: (req, res) => {
      handle(ctx, store, req, res).catch((error) => {
        if (!res.headersSent) json(res, { error: error.message }, 500)
        else if (!res.writableEnded) res.end()
      })
    },
  }))
}

async function handle(ctx, store, req, res) {
  const url = new URL(req.url ?? '/', 'http://learnlab.local')
  const route = url.pathname.slice(PREFIX.length) || '/'
  const method = req.method ?? 'GET'

  if (route === '/state' && method === 'GET') {
    const decks = await store.listDecks()
    return json(res, {
      build: 'v3',
      workspace: store.workspace,
      learnLabDir: store.baseDir,
      sourceDir: await store.sourceDir(),
      defaultSourceDir: path.join(store.rootDir, '课件源文件'),
      decks,
      model: selectionOf(ctx),
    })
  }

  if (route === '/settings' && method === 'POST') {
    const body = await readJson(req)
    const raw = String(body.sourceDir ?? '').trim()
    if (raw) {
      const dir = path.resolve(raw)
      try {
        await fsp.mkdir(dir, { recursive: true })
        const stat = await fsp.stat(dir)
        if (!stat.isDirectory()) throw new Error('不是文件夹')
      } catch (error) {
        throw new Error(`这个路径用不了：${error.message}`)
      }
      await writeConfig(store.rootDir, { sourceDir: dir })
    } else {
      await writeConfig(store.rootDir, { sourceDir: '' })
    }
    return json(res, { sourceDir: await store.sourceDir() })
  }

  if (route === '/files' && method === 'GET') {
    return json(res, { files: await store.listImportable() })
  }

  if (route === '/health' && method === 'GET') {
    return json(res, { kit: await kitStatus() })
  }

  if (route === '/translate' && method === 'POST') {
    const body = await readJson(req)
    const config = await readConfig(store.rootDir)
    const result = await translate(body.text, body.to, config)
    return json(res, result)
  }

  if (route === '/translate/config' && method === 'GET') {
    const config = await readConfig(store.rootDir)
    return json(res, {
      provider: config.provider ?? 'auto',
      appid: config.baidu?.appid ?? '',
      hasKey: Boolean(config.baidu?.key),
    })
  }

  if (route === '/translate/config' && method === 'POST') {
    const body = await readJson(req)
    const patch = {}
    if (typeof body.provider === 'string') patch.provider = body.provider
    const baidu = {}
    if (typeof body.appid === 'string') baidu.appid = body.appid.trim()
    if (typeof body.key === 'string') baidu.key = body.key.trim()
    if (Object.keys(baidu).length) patch.baidu = baidu
    const config = await writeConfig(store.rootDir, patch)
    return json(res, {
      provider: config.provider ?? 'auto',
      appid: config.baidu?.appid ?? '',
      hasKey: Boolean(config.baidu?.key),
    })
  }

  if (route === '/import' && method === 'POST') {
    const body = await readJson(req)
    openSse(res)
    try {
      const result = await importDeck(ctx, store, body.path, (phase) => sseSend(res, { type: 'phase', phase }))
      sseSend(res, { type: 'done', deck: result.deck, pages: result.pages, reused: Boolean(result.reused) })
    } catch (error) {
      sseSend(res, { type: 'error', message: error.message })
    } finally {
      if (!res.writableEnded) res.end()
    }
    return undefined
  }

  if (route === '/deck' && method === 'GET') {
    const id = url.searchParams.get('id') ?? ''
    const deck = await store.readDeck(id)
    const pages = await store.readPages(id)
    const notes = await store.readNotes(id)
    const summary = await store.readSummary(id)
    const chat = await store.readChat(id, 200)
    return json(res, { deck, pages, notes, summary, chat })
  }

  if (route === '/slide' && method === 'GET') {
    const id = url.searchParams.get('id') ?? ''
    const page = Number(url.searchParams.get('page') ?? '0')
    return sendFile(res, store.slidePath(id, page))
  }

  if (route === '/deck/delete' && method === 'POST') {
    const body = await readJson(req)
    const id = String(body.id ?? '')
    if (!id) throw new Error('缺少课件标识')
    const removed = await store.removeDeck(id)
    return json(res, { ok: true, id, removed })
  }

  if (route === '/progress' && method === 'POST') {
    const body = await readJson(req)
    const deck = await store.patchDeck(body.id, { progress: Number(body.page) || 1 })
    return json(res, { deck })
  }

  if (route === '/notes' && method === 'POST') {
    const body = await readJson(req)
    await store.writeNotes(body.id, String(body.text ?? ''))
    return json(res, { ok: true })
  }

  if (route === '/note' && method === 'POST') {
    const body = await readJson(req)
    const text = await store.appendNote(body.id, Number(body.page) || 1, body.title ?? '', String(body.text ?? ''))
    return json(res, { notes: text })
  }

  if (route === '/snapshot' && method === 'POST') {
    const body = await readJson(req)
    const raw = String(body.data ?? '').replace(/^data:image\/png;base64,/, '')
    if (!raw) throw new Error('截图内容为空')
    const buffer = Buffer.from(raw, 'base64')
    const file = await store.saveSnapshot(body.id, Number(body.page) || 1, buffer)
    return json(res, { path: file, bytes: buffer.length })
  }

  if (route === '/chat' && method === 'POST') {
    return chat(ctx, store, req, res)
  }

  if (route === '/summary' && method === 'POST') {
    return summary(ctx, store, req, res)
  }

  if (route === '/transcribe' && method === 'POST') {
    return transcribe(ctx, store, req, res)
  }

  return json(res, { error: `未知接口：${route}` }, 404)
}

/* ---------------------------------------------------------------- 导入 */

async function importDeck(ctx, store, sourcePath, report = () => {}) {
  if (!sourcePath) throw new Error('缺少文件路径')
  const abs = path.resolve(String(sourcePath))
  const ext = path.extname(abs).toLowerCase()
  const supported = ['.pptx', '.ppt', '.pdf', '.docx']
  if (!supported.includes(ext)) throw new Error(`只支持导入 ${supported.join(' / ')}`)

  // 只允许导入「课件文件夹」里的文件，避免从任意路径拖进来
  const sourceRoot = await store.sourceDir()
  const relative = path.relative(sourceRoot, abs)
  const inside = relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative)
  if (!inside) {
    throw new Error(`只能导入课件文件夹里的文件：${sourceRoot}`)
  }

  const known = (await store.listDecks()).find((deck) => deck.source === abs)
  if (known) {
    report('reused')
    const pages = await store.readPages(known.id)
    return { deck: known, pages, reused: true }
  }

  await fsp.access(abs)
  report('parse')
  const kind = ext === '.pdf' ? 'pdf' : (ext === '.docx' || ext === '.doc') ? 'docx' : 'pptx'
  const deck = await store.createDeck({ sourcePath: abs, kind })
  const meta = store.metaDir(deck.id)

  let pages = { pageCount: 0, pages: [] }
  let fullText = ''
  let textError
  try {
    if (kind === 'pptx') {
      let buf
      if (ext === '.pptx') {
        buf = await fsp.readFile(abs)
      } else {
        // .ppt 是二进制格式，先转成 pptx 再复用同一套解析
        const tempPptx = path.join(meta, 'tmp', 'converted.pptx')
        await convertTo(abs, tempPptx)
        buf = await fsp.readFile(tempPptx)
        await fsp.rm(path.join(meta, 'tmp'), { recursive: true, force: true }).catch(() => {})
      }
      const extracted = extractPptx(buf)
      pages = {
        pageCount: extracted.slides.length,
        pages: extracted.slides.map((slide) => ({
          page: slide.page,
          title: slide.title,
          text: slide.text,
          notes: slide.notes,
          lines: slide.lines,
          chars: slide.text.length,
          source: 'xml',
        })),
      }
    } else if (kind === 'docx') {
      // 文档没有「页内文字」的概念，取整份文本，按文档整体喂给教练
      const tempTxt = path.join(meta, 'tmp', 'converted.txt')
      await convertTo(abs, tempTxt)
      const raw = await fsp.readFile(tempTxt, 'utf8')
      await fsp.rm(path.join(meta, 'tmp'), { recursive: true, force: true }).catch(() => {})
      fullText = raw.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim().slice(0, 120000)
    }
  } catch (error) {
    textError = error.message
  }

  report('render')
  const manifest = await renderPages({ inputPath: abs, deckDir: meta })
  const pageCount = manifest?.pageCount || pages.pageCount || 0

  const aligned = []
  for (let i = 1; i <= pageCount; i += 1) {
    const existing = pages.pages[i - 1]
    aligned.push(existing ?? {
      page: i,
      title: `第 ${i} 页`,
      text: '',
      notes: '',
      lines: [],
      chars: 0,
      source: kind === 'pdf' ? 'none' : 'missing',
    })
  }

  const nextPages = { pageCount, pages: aligned }
  report('save')
  await store.writePages(deck.id, nextPages)

  const updated = await store.patchDeck(deck.id, {
    pageCount,
    fullText,
    outline: aligned.map((p) => ({ page: p.page, title: p.title })),
    textSource: kind === 'pdf' ? 'none' : textError ? 'images-only' : kind === 'docx' ? 'document' : 'xml',
    textError,
    progress: 1,
  })

  return { deck: updated, pages: nextPages }
}

/* ---------------------------------------------------------------- 对话 */

function selectionOf(ctx) {
  try {
    const selection = ctx.agentDefaultModel.currentSelection()
    return { provider: selection?.provider, model: selection?.model, reasoningEffort: selection?.reasoningEffort }
  } catch {
    return {}
  }
}

function buildCoachPrompt(deck, pagesData, page, question, history, requestedScope) {
  const pages = pagesData.pages ?? []
  const total = pages.reduce((sum, item) => sum + (item.chars || 0), 0)
  const outline = pages.map((item) => `${item.page}. ${item.title || '（无标题）'}`).join('\n')
  const current = pages[page - 1]
  const deckText = (limit) => {
    let text = pages
      .map((item) => `【第 ${item.page} 页】${item.title ? ` ${item.title}` : ''}\n${item.text || '（本页无文字）'}`)
      .join('\n\n')
    if (limit && text.length > limit) text = `${text.slice(0, limit)}\n\n（后面的页因为篇幅省略）`
    return text
  }
  const nearest = (n) => {
    const list = [-3, -2, -1, 0, 1, 2, 3].map((d) => n + d).filter((i) => i >= 1 && i <= pages.length)
    return list
      .map((i) => `【第 ${i} 页】${pages[i - 1]?.title ? ` ${pages[i - 1].title}` : ''}\n${pages[i - 1]?.text || '（本页无文字，请看图片）'}`)
      .join('\n\n')
  }

  let body
  let scope
  // Word 之类的文档只有一份整篇文字，页码只用来定位图片。
  // 除非用户明确要「只看本页」且这一页确实有文字，否则一律给全文——
  // 不能因为某一页被识别过就丢掉整篇。
  const documentText = deck.fullText
  if (documentText && !(requestedScope === 'page' && current?.text)) {
    scope = `整份文档正文（第 ${page} 页仅用于定位）`
    body = documentText.length > 60000 ? `${documentText.slice(0, 60000)}\n\n（后面省略）` : documentText
  } else if (requestedScope === 'page') {
    scope = `只看第 ${page} 页`
    body = current
      ? `【第 ${page} 页】${current.title ? ` ${current.title}` : ''}\n${current.text || '（本页无文字，请看图片）'}`
      : '（没有这一页）'
  } else if (requestedScope === 'deck') {
    scope = `整份课件（${pages.length} 页）`
    body = deckText(60000)
  } else if (total > 0 && total <= 8000 && pages.length <= 12) {
    scope = `整份课件（${pages.length} 页，全文较短）`
    body = deckText(0)
  } else {
    const near = [-3, -2, -1, 0, 1, 2, 3].map((d) => page + d).filter((i) => i >= 1 && i <= pages.length)
    scope = `第 ${near[0]}–${near[near.length - 1]} 页 + 全篇大纲`
    body = nearest(page)
  }

  const conversation = (history ?? [])
    .slice(-6)
    .map((turn) => `我：${turn.q}\n你：${turn.a}`)
    .join('\n\n')

  const prompt = [
    `【课件】${deck.title}（共 ${pages.length} 页）`,
    `【当前页】第 ${page} 页${current?.title ? ` ${current.title}` : ''}`,
    `【正文范围】${scope}`,
    '',
    '【全篇大纲】',
    outline || '（无）',
    '',
    '【正文】',
    body || '（课件还没有提取到文字）',
    current?.notes ? `\n【本页备注】\n${current.notes}` : '',
    conversation ? `\n【我们刚刚的对话】\n${conversation}` : '',
    '',
    `【我现在的问题】\n${question}`,
  ]
    .filter((line) => line !== undefined)
    .join('\n')

  return { prompt, scope }
}

async function imageBlock(ctx, store, deckId, page) {
  const file = store.slidePath(deckId, page)
  const data = await fsp.readFile(file)
  const ref = await ctx.attachments.saveImage({
    data,
    mediaType: 'image/png',
    name: `page-${page}.png`,
  })
  return { type: 'image', attachment: ref }
}

async function* modelStream(ctx, { system, prompt, images, signal }) {
  const selection = selectionOf(ctx)
  if (!selection.provider || !selection.model) throw new Error('还没有可用的默认模型，请先在设置里选一个')
  const content = [{ type: 'text', text: prompt }]
  for (const block of images ?? []) content.push(block)
  const stream = ctx.llm.stream({
    provider: selection.provider,
    model: selection.model,
    system,
    signal,
    messages: [{ role: 'user', content }],
  })
  for await (const chunk of stream) {
    if (chunk.type === 'text-delta') yield { type: 'text', text: chunk.text }
    else if (chunk.type === 'usage' && chunk.usage) yield { type: 'usage', usage: chunk.usage }
    else if (chunk.type === 'finish' && chunk.reason?.kind === 'error') {
      throw new Error(chunk.reason.failure?.message ?? '模型调用失败')
    } else if (chunk.type === 'finish' && chunk.reason?.kind === 'aborted') {
      throw new Error('已停止')
    }
  }
}

function openSse(res) {
  res.writeHead(200, {
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-cache, no-transform',
    connection: 'keep-alive',
    'x-accel-buffering': 'no',
  })
  res.flushHeaders?.()
}

function sseSend(res, payload) {
  if (!res.writableEnded) res.write(`data: ${JSON.stringify(payload)}\n\n`)
}

async function chat(ctx, store, req, res) {
  const body = await readJson(req)
  const deck = await store.readDeck(body.id)
  const pagesData = await store.readPages(body.id)
  const page = Math.min(Math.max(Number(body.page) || 1, 1), Math.max(pagesData.pages.length, 1))
  const question = String(body.question ?? '').trim()
  if (!question) throw new Error('问题不能为空')

  const controller = new AbortController()
  res.on('close', () => controller.abort())

  openSse(res)
  let answer = ''
  let usage
  let hasImage = false
  try {
    let images = []
    if (body.annotatedImage) {
      const raw = String(body.annotatedImage).replace(/^data:image\/png;base64,/, '')
      const data = Buffer.from(raw, 'base64')
      const ref = await ctx.attachments.saveImage({ data, mediaType: 'image/png', name: `page-${page}-annotated.png` })
      images = [{ type: 'image', attachment: ref }]
      hasImage = true
    } else if (body.withImage) {
      images = [await imageBlock(ctx, store, body.id, page)]
      hasImage = true
    }
    const { prompt, scope } = buildCoachPrompt(deck, pagesData, page, question, body.history ?? [], body.scope)
    sseSend(res, { type: 'scope', label: scope, withImage: hasImage })
    const system = body.allowDraw ? [...COACH_SYSTEM, ...DRAW_SYSTEM].join('\n') : COACH_SYSTEM.join('\n')
    for await (const event of modelStream(ctx, {
      system,
      prompt,
      images,
      signal: controller.signal,
    })) {
      if (event.type === 'text') {
        answer += event.text
        sseSend(res, { type: 'delta', text: event.text })
      } else if (event.type === 'usage') {
        usage = event.usage
        sseSend(res, { type: 'usage', usage: event.usage })
      }
    }
    if (body.replaceLast) await store.dropLastChat(body.id, page)
    await store.appendChat(body.id, {
      at: new Date().toISOString(),
      page,
      q: question,
      a: answer,
      withImage: hasImage,
      usage,
    })
    sseSend(res, { type: 'done', answer, usage })
  } catch (error) {
    if (controller.signal.aborted) {
      // 用户暂停：把已经生成的部分存下来，历史与界面才对得上
      try {
        if (body.replaceLast) await store.dropLastChat(body.id, page)
        await store.appendChat(body.id, {
          at: new Date().toISOString(),
          page,
          q: question,
          a: answer,
          withImage: hasImage,
          usage,
          stopped: true,
        })
      } catch {
        /* 落盘失败不影响暂停本身 */
      }
      return
    }
    sseSend(res, { type: 'error', message: error.message })
  } finally {
    if (!res.writableEnded) res.end()
  }
}

/* ---------------------------------------------------------------- 总结 */

async function summary(ctx, store, req, res) {
  const body = await readJson(req)
  const deck = await store.readDeck(body.id)
  const pagesData = await store.readPages(body.id)
  const chatLog = await store.readChat(body.id, 300)
  const questions = [...new Set(chatLog.map((entry) => entry.q).filter(Boolean))].slice(-40)

  const controller = new AbortController()
  res.on('close', () => controller.abort())
  openSse(res)

  let out = ''
  let usage
  try {
    const prompt = buildSummaryPrompt(deck, pagesData, questions)
    for await (const event of modelStream(ctx, {
      system: SUMMARY_SYSTEM.join('\n'),
      prompt,
      signal: controller.signal,
    })) {
      if (event.type === 'text') {
        out += event.text
        sseSend(res, { type: 'delta', text: event.text })
      } else if (event.type === 'usage') {
        usage = event.usage
        sseSend(res, { type: 'usage', usage: event.usage })
      }
    }
    const markdown = `# ${deck.title} · 学习总结\n\n> 生成时间：${new Date().toLocaleString('zh-CN')}\n\n${stripLeadingHeading(out)}\n`
    await store.writeSummary(body.id, markdown)
    sseSend(res, { type: 'done', markdown, path: path.join(store.deckDir(body.id), 'summary.md') })
  } catch (error) {
    sseSend(res, { type: 'error', message: error.message })
  } finally {
    if (!res.writableEnded) res.end()
  }
}

function buildSummaryPrompt(deck, pagesData, questions) {
  const pages = pagesData.pages ?? []
  const text = pages
    .map((item) => `【第 ${item.page} 页】${item.title ? ` ${item.title}` : ''}\n${item.text || '（本页无文字）'}`)
    .join('\n\n')
  return [
    `【课件】${deck.title}（共 ${pages.length} 页）`,
    '',
    '【逐页内容】',
    text,
    '',
    '【学生问过的问题】',
    questions.length ? questions.map((q) => `- ${q}`).join('\n') : '（没有提问记录）',
    '',
    '请按下面的结构写一份总结，使用二级标题：',
    '## 一句话主旨',
    '## 知识结构',
    '（用层级列表画出这份课件的骨架，标出页码）',
    '## 核心概念',
    '（每个概念：定义 + 为什么重要 + 常见误解）',
    '## 逻辑链',
    '（这份课件是怎么一步步推进的，关键转折在哪）',
    '## 易错点与考点',
    '## 我没搞懂的点',
    '（从学生问过的问题反向推断他薄弱的地方，没有就写「暂时没有」）',
    '## 自测题',
    '（5 道，覆盖全篇；每题下面用「<details><summary>答案</summary>」折叠给出答案）',
  ].join('\n')
}

function stripLeadingHeading(markdown) {
  return markdown.replace(/^\s*#\s+.*\n+/, '').trim()
}

/* ---------------------------------------------------------------- 识别 */

async function transcribe(ctx, store, req, res) {
  const body = await readJson(req)
  const deck = await store.readDeck(body.id)
  const pagesData = await store.readPages(body.id)
  const wanted = Array.isArray(body.pages) && body.pages.length
    ? body.pages.map(Number)
    : pagesData.pages.map((item) => item.page)
  const targets = wanted.filter((n) => {
    const item = pagesData.pages[n - 1]
    return item && (!item.text || item.source !== 'vision')
  })

  const controller = new AbortController()
  res.on('close', () => controller.abort())
  openSse(res)

  const done = new Set(deck.visionDone ?? [])
  try {
    for (const page of targets) {
      sseSend(res, { type: 'page-start', page })
      const images = [await imageBlock(ctx, store, body.id, page)]
      let text = ''
      for await (const event of modelStream(ctx, {
        system: TRANSCRIBE_SYSTEM.join('\n'),
        prompt: `这是《${deck.title}》的第 ${page} 页，请转录。`,
        images,
        signal: controller.signal,
      })) {
        if (event.type === 'text') text += event.text
      }
      const clean = text.trim()
      const item = pagesData.pages[page - 1]
      item.text = clean === '[无文字]' ? '' : clean
      item.chars = item.text.length
      item.source = 'vision'
      done.add(page)
      await store.writePages(body.id, pagesData)
      await store.patchDeck(body.id, { visionDone: [...done].sort((a, b) => a - b), textSource: 'vision' })
      sseSend(res, { type: 'page-done', page, chars: item.chars })
    }
    sseSend(res, { type: 'done', pages: [...done].sort((a, b) => a - b) })
  } catch (error) {
    sseSend(res, { type: 'error', message: error.message })
  } finally {
    if (!res.writableEnded) res.end()
  }
}

/* ---------------------------------------------------------------- 工具 */

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('请求体过大'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (!chunks.length) return resolve({})
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch (error) {
        reject(new Error(`请求不是合法 JSON：${error.message}`))
      }
    })
    req.on('error', reject)
  })
}

function json(res, data, status = 200) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
  })
  res.end(body)
}

async function sendFile(res, file) {
  try {
    const data = await fsp.readFile(file)
    res.writeHead(200, {
      'content-type': 'image/png',
      'content-length': data.length,
      'cache-control': 'no-cache',
    })
    res.end(data)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('not found')
  }
}
