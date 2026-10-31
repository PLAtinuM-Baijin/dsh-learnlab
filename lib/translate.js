import crypto from 'node:crypto'
import fsp from 'node:fs/promises'
import path from 'node:path'

const CACHE = new Map()
const MAX_CACHE = 300

/** 粗判语言：中日韩字符占比够高就算中文。 */
export function detectLang(text) {
  const cjk = (String(text).match(/[\u3400-\u9fff\u3040-\u30ff]/g) || []).length
  const latin = (String(text).match(/[A-Za-z]/g) || []).length
  if (!cjk && !latin) return 'en'
  return cjk >= latin * 0.5 ? 'zh' : 'en'
}

function chunkText(text, limit) {
  if (text.length <= limit) return [text]
  const chunks = []
  let rest = text
  while (rest.length > limit) {
    let cut = rest.lastIndexOf('\n', limit)
    if (cut < limit * 0.5) cut = rest.lastIndexOf('。', limit)
    if (cut < limit * 0.5) cut = rest.lastIndexOf('. ', limit)
    if (cut < limit * 0.5) cut = limit
    chunks.push(rest.slice(0, cut + 1))
    rest = rest.slice(cut + 1)
  }
  if (rest.trim()) chunks.push(rest)
  return chunks
}

async function baidu(text, to, config) {
  const appid = config?.baidu?.appid
  const key = config?.baidu?.key
  if (!appid || !key) throw new Error('还没填百度翻译的 appid / 密钥')
  const salt = String(Date.now())
  const sign = crypto.createHash('md5').update(appid + text + salt + key).digest('hex')
  const params = new URLSearchParams({
    q: text,
    from: 'auto',
    to: to === 'zh' ? 'zh' : 'en',
    appid,
    salt,
    sign,
  })
  const res = await fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate?${params}`, {
    signal: AbortSignal.timeout(15000),
  })
  const data = await res.json()
  if (data.error_code) {
    const hint = {
      52001: '请求超时',
      52002: '系统错误',
      52003: '未授权，检查 appid 或密钥',
      54000: '必填参数为空',
      54001: '签名错误，检查密钥',
      54003: '访问频率受限',
      54004: '账户余额不足',
      54005: '长文本请求频繁',
      58000: '客户端 IP 非法，需要在百度控制台配置 IP 白名单',
      58001: '语言方向不支持',
    }[data.error_code]
    throw new Error(`百度翻译：${hint || data.error_msg}（${data.error_code}）`)
  }
  return (data.trans_result || []).map((item) => item.dst).join('\n')
}

async function mymemory(text, from, to) {
  const langpair = `${from === 'zh' ? 'zh-CN' : 'en'}|${to === 'zh' ? 'zh-CN' : 'en'}`
  const parts = []
  for (const chunk of chunkText(text, 450)) {
    const params = new URLSearchParams({ q: chunk, langpair })
    const res = await fetch(`https://api.mymemory.translated.net/get?${params}`, {
      signal: AbortSignal.timeout(20000),
    })
    const data = await res.json()
    const status = Number(data.responseStatus)
    if (status !== 200) throw new Error(`MyMemory：${data.responseDetails || status}`)
    const translated = data.responseData?.translatedText
    if (!translated) throw new Error('MyMemory 没有返回译文')
    parts.push(translated)
  }
  return parts.join('\n')
}

/** 按优先级尝试翻译服务；返回译者和原文语言。 */
export async function translate(text, target, config = {}) {
  const raw = String(text ?? '').trim()
  if (!raw) return { text: '', provider: 'none', from: 'en', to: target || 'zh' }
  const from = detectLang(raw)
  const to = target || (from === 'zh' ? 'en' : 'zh')
  if (from === to) return { text: raw, provider: 'none', from, to, sameLang: true }

  const cacheKey = `${from}|${to}|${raw}`
  const hit = CACHE.get(cacheKey)
  if (hit) return { ...hit, cached: true }

  const order = []
  if (config?.provider === 'mymemory') order.push('mymemory')
  else if (config?.provider === 'baidu') order.push('baidu')
  else {
    if (config?.baidu?.appid && config?.baidu?.key) order.push('baidu')
    order.push('mymemory')
  }

  let lastError
  for (const provider of order) {
    try {
      const output = provider === 'baidu'
        ? await baidu(raw, to, config)
        : await mymemory(raw, from, to)
      const result = { text: output, provider, from, to }
      if (CACHE.size > MAX_CACHE) CACHE.clear()
      CACHE.set(cacheKey, result)
      return result
    } catch (error) {
      lastError = error
    }
  }
  throw new Error(lastError?.message || '翻译服务不可用')
}

export async function readConfig(rootDir) {
  try {
    return JSON.parse(await fsp.readFile(path.join(rootDir, '.config.json'), 'utf8'))
  } catch {
    return {}
  }
}

export async function writeConfig(rootDir, patch) {
  const current = await readConfig(rootDir)
  const next = {
    ...current,
    ...patch,
    baidu: { ...(current.baidu ?? {}), ...(patch.baidu ?? {}) },
  }
  await fsp.mkdir(rootDir, { recursive: true })
  await fsp.writeFile(path.join(rootDir, '.config.json'), `${JSON.stringify(next, null, 2)}\n`, 'utf8')
  return next
}
