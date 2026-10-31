import path from 'node:path'
import fsp from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const KIT_PACKAGE = ['@deepseek-ai', 'libreoffice-kit', 'lib', 'index.js']

function kitCandidates() {
  const list = []
  const override = process.env.DSH_LIBREOFFICE_KIT
  if (override) list.push(override)
  const resources = process.resourcesPath
  if (resources) {
    list.push(path.join(resources, 'app.asar.unpacked', 'dsh', 'node_modules', ...KIT_PACKAGE))
    list.push(path.join(resources, 'app.asar', 'dsh', 'node_modules', ...KIT_PACKAGE))
  }
  if (process.execPath) {
    list.push(path.join(path.dirname(process.execPath), 'resources', 'app.asar.unpacked', 'dsh', 'node_modules', ...KIT_PACKAGE))
  }
  return list
}

let kitPromise

export async function loadKit() {
  kitPromise ??= (async () => {
    const attempts = []
    try {
      return await import('@deepseek-ai/libreoffice-kit')
    } catch (error) {
      attempts.push(`bare import: ${error.message}`)
    }
    for (const candidate of kitCandidates()) {
      try {
        return await import(pathToFileURL(candidate).href)
      } catch (error) {
        attempts.push(`${candidate}: ${error.message}`)
      }
    }
    const failure = new Error(`找不到 LibreOffice 转换组件。${attempts.join(' | ')}`)
    failure.code = 'KIT_UNAVAILABLE'
    throw failure
  })()
  return kitPromise
}

const locks = new Map()

function withLock(key, task) {
  const previous = locks.get(key) ?? Promise.resolve()
  const next = previous.then(task, task)
  locks.set(key, next.catch(() => {}))
  return next
}

/**
 * 把一份课件渲染成逐页 PNG。
 * 先渲染到临时目录，成功后再替换 pages/，避免留下半套图。
 */
export async function renderPages({ inputPath, deckDir, dpi = 120, pages }) {
  return withLock(deckDir, async () => {
    const kit = await loadKit()
    const finalDir = path.join(deckDir, 'pages')
    const tempDir = path.join(deckDir, 'pages.tmp')
    await fsp.rm(tempDir, { recursive: true, force: true })
    const converter = await kit.createConverter({ timeoutMs: 300000 })
    try {
      const manifest = await converter.renderImages({
        inputPath,
        outputDir: tempDir,
        dpi,
        maxPages: pages && pages.length ? pages.length : 500,
        maxPixels: 16777216,
        maxDimension: 8192,
        ...(pages && pages.length ? { pages } : {}),
      })
      await fsp.rm(finalDir, { recursive: true, force: true })
      await fsp.rename(tempDir, finalDir)
      return manifest
    } catch (error) {
      await fsp.rm(tempDir, { recursive: true, force: true }).catch(() => {})
      throw error
    } finally {
      await converter.dispose().catch(() => {})
    }
  })
}

export async function kitStatus() {
  try {
    const kit = await loadKit()
    const runtime = await kit.discoverRuntime?.()
    return { ok: true, version: kit.ENGINE_VERSION, backend: runtime?.backend ?? runtime?.kind ?? 'unknown' }
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

/**
 * 用同一个 LibreOffice 把课件转成别的格式。
 * .ppt → .pptx（再走我们自己的 pptx 解析）、.docx → .txt（拿全文）。
 */
export async function convertTo(inputPath, outputPath) {
  const kit = await loadKit()
  const converter = await kit.createConverter({ timeoutMs: 300000 })
  try {
    await fsp.mkdir(path.dirname(outputPath), { recursive: true })
    await fsp.rm(outputPath, { force: true })
    await converter.convert({ inputPath, outputPath })
  } finally {
    await converter.dispose().catch(() => {})
  }
}
